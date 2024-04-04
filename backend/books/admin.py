from django.contrib import admin

from books.models import Books, Tags


@admin.register(Books)
class BooksAdmin(admin.ModelAdmin):
    pass


@admin.register(Tags)
class TagsAdmin(admin.ModelAdmin):
    pass
