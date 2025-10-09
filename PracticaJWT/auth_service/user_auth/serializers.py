from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'roles', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def get_roles(self, obj):
        return [group.name for group in obj.groups.all()]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        # Asignar el usuario al grupo 'usuario' por defecto
        user_group, created = Group.objects.get_or_create(name='usuario')
        user.groups.add(user_group)
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['roles'] = [group.name for group in user.groups.all()]

        return token
