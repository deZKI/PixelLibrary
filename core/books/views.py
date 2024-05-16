from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.db.models import Avg
from rest_framework.exceptions import PermissionDenied

from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from .models import Books, Tags, BasketItem, WishItem, BookComment
from .serializers import BooksSerializer, TagsSerializer, BooksDetailSerializer, BasketItemSerializer, \
    WishItemSerializer, WishItemCreationSerializer, BasketItemCreationSerializer, BookCommentSerializer


class BooksViewSet(ReadOnlyModelViewSet):
    queryset = Books.objects.all().prefetch_related('tags', 'authors', 'comments').annotate(
        rating=Avg('comments__rating'))
    serializer_class = BooksSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return BooksSerializer
        return BooksDetailSerializer

    @method_decorator(cache_page(60 * 5))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class TagsViewSet(ReadOnlyModelViewSet):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    @method_decorator(cache_page(60 * 5))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class UserItemViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post', 'delete']

    def get_queryset(self):
        # Возвращает список желаний только для текущего пользователя
        return self.queryset.filter(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_queryset().get(book=kwargs['pk'])
        except Exception as error:
            print('error', error)
            return Response({"detail": "Вы не можете удалить несуществующий элемент."},
                            status=status.HTTP_404_NOT_FOUND)

        if instance.user != request.user:
            return Response({"detail": "Вы не можете удалить чужой элемент."},
                            status=status.HTTP_403_FORBIDDEN)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class WishItemViewSet(UserItemViewSet):
    queryset = WishItem.objects.all()
    serializer_class = WishItemSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return WishItemCreationSerializer
        return WishItemSerializer


class BasketItemViewSet(UserItemViewSet):
    queryset = BasketItem.objects.all()
    serializer_class = BasketItemSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return BasketItemCreationSerializer
        return BasketItemSerializer


class CommentBaseView(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        obj = serializer.instance
        if obj.user != self.request.user:
            raise PermissionDenied("Вы не можете изменять комментарии других пользователей.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("Вы не можете удалять комментарии других пользователей.")
        instance.delete()


class BookCommentView(CommentBaseView):
    queryset = BookComment.objects.all()
    serializer_class = BookCommentSerializer
    permission_classes = [permissions.IsAuthenticated]
