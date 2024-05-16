from rest_framework import serializers

from .models import Users


class UsersRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Users
        fields = ('email', 'password',)

    def create(self, validated_data):
        user = Users.objects.create(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'first_name', 'last_name', 'email']


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'first_name', 'last_name', 'email', 'patronymic', 'birthday_date', 'phone_number']
