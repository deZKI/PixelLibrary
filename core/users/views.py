from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .permissions import UsersDetailPermission
from .serializers import UsersRegistrationSerializer, UserDetailSerializer
from .models import Users


class UserRegistrationAPIView(APIView):

    @swagger_auto_schema(operation_description="Регистрация нового пользователя",
                         request_body=UsersRegistrationSerializer,
                         responses={status.HTTP_201_CREATED: UsersRegistrationSerializer,
                                    status.HTTP_400_BAD_REQUEST: 'Пользователь с таким email существует'
                                    }
                         )
    def post(self, request):
        serializer = UsersRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'email': user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsersDetailView(ModelViewSet):
    serializer_class = UserDetailSerializer
    queryset = Users.objects.all()
    permission_classes = [UsersDetailPermission]
    http_method_names = ['get', 'retrieve', 'patch']

    def get_queryset(self):
        """
        В этом методе изменяем queryset в зависимости от пользователя.
        """
        if self.request.user.is_superuser:
            return Users.objects.all()
        else:
            # Пользователи видят только свой профиль
            return Users.objects.filter(id=self.request.user.id)

    def get_object(self):
        """
        Переопределяем метод для получения объекта, чтобы убедиться,
        что пользователи могут получать только свои данные, если они не суперадмин.
        """
        if self.request.user.is_superuser:
            return super().get_object()
        else:
            return self.request.user

    @swagger_auto_schema(
        method='get',
        operation_description="Получает данные по текущему пользователю.",
        responses={200: UserDetailSerializer,
                   401: "Unauthorized"},

    )
    @action(detail=False, methods=['get'], url_path='me')
    def booking_dates_by_room(self, request):

        serializer = UserDetailSerializer(self.request.user)

        return Response(serializer.data)
