from django.contrib import admin
from guardian.admin import GuardedModelAdmin

from books.models import Books, Tags, AuthComment, BookComment, WishItem, BasketItem


@admin.register(Books)
class BooksAdmin(GuardedModelAdmin):
    pass


@admin.register(Tags)
class TagsAdmin(admin.ModelAdmin):
    pass


class WishItemTabAdmin(admin.TabularInline):
    model = WishItem
    fields = ['book']
    extra = 0


class BasketItemTabAdmin(admin.TabularInline):
    model = BasketItem
    fields = ['book']
    extra = 0


@admin.register(BookComment)
class BookCommentAdmin(admin.ModelAdmin):
    """ BookComment """
    pass


@admin.register(AuthComment)
class AuthCommentAdmin(admin.ModelAdmin):
    """ AuthComment """
    pass
