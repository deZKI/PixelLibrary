from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from users.models import AuthComment, BookComment, Users

admin.site.unregister(Group)


@admin.register(Users)
class UsersAdmin(UserAdmin):
    """ Custom User Admin """
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (_("Personal info"), {"fields": (
            "first_name", "last_name", "patronymic", "phone_number", "birthday_date", "balance", "telegram_chat_id")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )
    list_display = ("email", "first_name", "last_name", "is_staff")
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")
    search_fields = ("first_name", "last_name", "email")
    ordering = ("email",)
    filter_horizontal = (
        "groups",
        "user_permissions",
    )


@admin.register(BookComment)
class BookCommentAdmin(admin.ModelAdmin):
    """ BookComment """
    pass


@admin.register(AuthComment)
class AuthCommentAdmin(admin.ModelAdmin):
    """ AuthComment """
    pass
