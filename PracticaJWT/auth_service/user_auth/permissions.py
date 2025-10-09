# user_auth/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminOrSelf(BasePermission):
    """
    Permite acceso si el usuario es admin (pertenece al grupo 'admin')
    o si está accediendo a su propio recurso.
    """

    def has_permission(self, request, view):
        # permisos generales (determinados en has_object_permission para detalle)
        # Permitimos que List/Create sean controlados por view.permission_classes en las vistas
        return True

    def has_object_permission(self, request, view, obj):
        # obj es instancia de User
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # admin por grupo 'admin'
        if user.groups.filter(name='admin').exists():
            return True

        # propietario (acceso a su propio recurso)
        return obj.pk == user.pk
