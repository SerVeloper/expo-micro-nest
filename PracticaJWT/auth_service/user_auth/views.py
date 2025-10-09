# user_auth/views.py
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .permissions import IsAdminOrSelf
from django.shortcuts import get_object_or_404

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Registro público (similar a tu RegisterView)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

# Listar usuarios (solo admin) y crear usuarios (opcional: solo admin o AllowAny)
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # Para creación permitir cualquier persona (registro público),
        # para listar solo admin
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated(), ]

    def list(self, request, *args, **kwargs):
        # Listar solo si es admin
        user = request.user
        if not user.is_authenticated or not user.groups.filter(name='admin').exists():
            return Response({'detail': 'No autorizado.'}, status=status.HTTP_403_FORBIDDEN)
        return super().list(request, *args, **kwargs)

# Recuperar, actualizar y eliminar (logical delete) un usuario
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsAdminOrSelf)

    def perform_destroy(self, instance):
        # Eliminación lógica: marcar is_active = False
        instance.is_active = False
        instance.save()

    # opcional: controlar partial_update para set_password manejado por serializer.update
