# user_auth/serializers.py
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField(read_only=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'roles', 'password', 'is_active', 'first_name', 'last_name')
        extra_kwargs = {
            'email': {'required': True}
        }

    def get_roles(self, obj):
        return [group.name for group in obj.groups.all()]

    def validate_email(self, value):
        user_qs = User.objects.filter(email__iexact=value)
        if self.instance:
            user_qs = user_qs.exclude(pk=self.instance.pk)
        if user_qs.exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.is_active = True
        user.save()

        # Asignar rol por defecto 'usuario'
        user_group, _ = Group.objects.get_or_create(name='usuario')
        user.groups.add(user_group)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        # actualizar los campos normales
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['roles'] = [group.name for group in user.groups.all()]
        return token
