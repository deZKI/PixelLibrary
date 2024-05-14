from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from authors.models import Authors
from books.models import Books
from users.managers import CustomUserManager


class Users(AbstractUser):
    """ A custom user model """
    username = None
    email = models.EmailField(unique=True, blank=False)
    balance = models.FloatField(default=0)
    telegram_chat_id = models.CharField(unique=True, blank=True, max_length=124, null=True)
    patronymic = models.CharField(blank=True, null=True, max_length=128, verbose_name='Отчество')
    birthday_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, verbose_name='Номер телефона', null=True, blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email


class CommentBase(models.Model):
    """Base class for comments"""

    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    @property
    def edited(self):
        return self.edited_at != self.created_at

    def created_at_unix_timestamp(self) -> int:
        return int(self.created_at.timestamp())

    def edited_at_unix_timestamp(self) -> int:
        return int(self.edited_at.timestamp())

    class Meta:
        abstract = True


class BookComment(CommentBase):
    """A comment on a book"""

    book = models.ForeignKey(Books, related_name='comments', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Book Comment'
        unique_together = ('user', 'book')


class AuthComment(CommentBase):
    """A comment on an author"""

    author = models.ForeignKey(Authors, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Author Comment'
        unique_together = ('user', 'author')


class WishItem(models.Model):
    """A bookmark / wish book"""
    user = models.ForeignKey(to=Users, on_delete=models.CASCADE)
    book = models.ForeignKey(to=Books, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'список желаний'
        verbose_name_plural = 'список желаний'
        unique_together = ('user', 'book')


class BasketItem(models.Model):
    """A basket """
    user = models.ForeignKey(to=Users, on_delete=models.CASCADE)
    book = models.ForeignKey(to=Books, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзина'
        unique_together = ('user', 'book')

    def __str__(self):
        return f'Корзина для {self.user.email} | книга: {self.book.title}'
