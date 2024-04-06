from guardian.shortcuts import assign_perm, remove_perm

from books.models import Books
from users.models import Users

from .abstract import AbstractPermissionsService
from .types import PermissionType


class BookPermissionsService(AbstractPermissionsService):

    @staticmethod
    def has_permission(obj: Books, user: Users, perm: PermissionType):
        user.has_perm(perm=perm, obj=obj)

    @staticmethod
    def assign_permission(obj: Books, user: Users, perm: PermissionType):
        assign_perm(perm, user, obj)

    @staticmethod
    def remove_permission(obj: Books, user: Users, perm: PermissionType):
        remove_perm(perm, user, obj)
