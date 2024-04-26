from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UsersRegistrationSerializer


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
