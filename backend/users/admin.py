from django.contrib import admin

from users.models import Users, BookComment, AuthComment

from django.contrib.auth.models import Group

admin.site.unregister(Group)


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    """ Custom User Admin """
    pass


@admin.register(BookComment)
class BookCommentAdmin(admin.ModelAdmin):
    """ BookComment """
    pass


@admin.register(AuthComment)
class AuthCommentAdmin(admin.ModelAdmin):
    """ AuthComment """
    pass
