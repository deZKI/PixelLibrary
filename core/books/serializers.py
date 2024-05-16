from rest_framework.serializers import ModelSerializer, FloatField, HiddenField, CurrentUserDefault, \
    PrimaryKeyRelatedField, SerializerMethodField

from services.permissions import BookPermissionsService
from books.models import Books, Authors, Tags, BasketItem, WishItem, BookComment
from users.serializers import UserSerializer


class BookCommentSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = BookComment
        fields = ['id', 'user', 'text', 'created_at', 'edited_at', 'rating', 'edited']


class BookCommentCreationSerializer(ModelSerializer):
    user = HiddenField(
        default=CurrentUserDefault()
    )

    class Meta:
        model = BookComment
        fields = ['id', 'user', 'text', 'created_at', 'edited_at', 'rating', 'edited']


class AuthorsSerializer(ModelSerializer):
    class Meta:
        model = Authors
        fields = '__all__'


class AuthorsShortSerializer(ModelSerializer):
    class Meta:
        model = Authors
        fields = ('name', 'surname', 'last_name',)


class TagsSerializer(ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'


class BooksSerializer(ModelSerializer):
    authors = AuthorsShortSerializer(many=True, read_only=True)
    rating = FloatField(read_only=True)

    class Meta:
        fields = ('id', 'title', 'thumbnail', 'authors', 'rating', 'price')
        model = Books


class BooksDetailSerializer(BooksSerializer):
    tags = TagsSerializer(many=True, read_only=True)
    comments = BookCommentSerializer(many=True, read_only=True)
    in_basket = SerializerMethodField()
    in_wishes = SerializerMethodField()

    def get_in_basket(self, book: Books):
        request = self.context.get('request')
        if not request.user.is_authenticated:
            return False
        return BasketItem.objects.filter(user=request.user, book=book).exists()

    def get_in_wishes(self, book: Books):
        request = self.context.get('request')
        if not request.user.is_authenticated:
            return False
        return WishItem.objects.filter(user=request.user, book=book).exists()

    class Meta:
        fields = '__all__'
        model = Books

    def to_representation(self, instance):
        """
        Dynamically add 'file' if user has view file permission.
        """
        representation = super().to_representation(instance)
        request = self.context.get('request')

        if request and request.user.is_authenticated:
            # Проверяем, есть ли у пользователя доступ к файлу этой книги
            has_permission_to_view_file = BookPermissionsService.has_permission(instance, request.user, 'view')

            if not has_permission_to_view_file:
                # Если у пользователя нет доступа, удаляем информацию о файле
                representation.pop('file', None)
        else:
            # Если пользователь не авторизован
            representation.pop('file', None)

        return representation


class UserItemSerializer(ModelSerializer):
    book = BooksSerializer()
    user = HiddenField(
        default=CurrentUserDefault()
    )


class UserItemCreationSerializer(ModelSerializer):
    book = PrimaryKeyRelatedField(queryset=Books.objects.all())

    user = HiddenField(
        default=CurrentUserDefault()
    )


class WishItemSerializer(UserItemSerializer):
    class Meta(UserItemSerializer):
        model = WishItem
        fields = ['id', 'user', 'book']


class BasketItemSerializer(UserItemSerializer):
    class Meta:
        model = BasketItem
        fields = ['id', 'user', 'book']


class WishItemCreationSerializer(UserItemCreationSerializer):
    class Meta:
        model = WishItem
        fields = ['id', 'user', 'book']


class BasketItemCreationSerializer(UserItemCreationSerializer):
    class Meta:
        model = BasketItem
        fields = ['id', 'user', 'book']
