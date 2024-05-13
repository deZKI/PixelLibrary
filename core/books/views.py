from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.db.models import Avg

from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Books, Tags
from .serializers import BooksSerializer, TagsSerializer, BooksDetailSerializer


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
