import json

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from authors.models import Authors
from users.models import Users

from rabbitmq.notification import send_booking_notification


class Tags(models.Model):
    name = models.CharField(max_length=20, unique=True)

    class Meta:
        verbose_name = 'Tag'
        verbose_name_plural = "Tags"

    def __str__(self):
        return self.name


class Books(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)

    thumbnail = models.ImageField(upload_to='images/books/thumbnail/', null=False, blank=False)
    file = models.FileField(upload_to='books/', null=True, blank=True)
    authors = models.ManyToManyField(to=Authors, related_name='books')
    tags = models.ManyToManyField(to=Tags, related_name='books')
    release_date = models.DateField(null=False, blank=False)
    price = models.IntegerField(default=0)
    page_count = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'
        permissions = (
            ('view', 'User can view file of book'),
        )

    def __str__(self):
        return f"{self.title} {self.release_date}"


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

    def save(
            self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        self.clean()
        message = json.dumps({
            'user_id': self.user.id,
            'book_id': self.book_id,
            'text': f"Корзина для {self.user.email} | книга: {self.book.title}"
        })
        send_booking_notification(message)

        super(BasketItem, self).save(force_insert, force_update, using,
                                     update_fields)  # Вызов оригинального метода save

    def __str__(self):
        return f'Корзина для {self.user.email} | книга: {self.book.title}'
