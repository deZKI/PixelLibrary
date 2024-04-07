from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.db.models import Avg

from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Books
from .serializers import BooksSerializer


class BookViewSet(ReadOnlyModelViewSet):
    queryset = Books.objects.all().prefetch_related('tags', 'authors').annotate(rating=Avg('bookcomment__rating'))
    serializer_class = BooksSerializer

    @method_decorator(cache_page(60 * 5))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)