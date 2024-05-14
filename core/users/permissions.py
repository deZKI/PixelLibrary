from rest_framework.permissions import BasePermission, SAFE_METHODS


class UsersDetailPermission(BasePermission):
    """
    Права доступа: суперадмин или пользователь, запрашивающий собственные данные.
    """

    def has_permission(self, request, view):
        # Разрешить суперадминам все действия
        if request.user.is_superuser:
            return True

        # Для остальных пользователей разрешить только безопасные методы (GET)
        if request.method in SAFE_METHODS:
            return True

        return False

    def has_object_permission(self, request, view, obj):
        # Суперадмин может видеть все объекты
        if request.user.is_superuser:
            return True

        # Пользователи могут видеть только свои объекты
        return obj == request.user
