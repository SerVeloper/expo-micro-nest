from django.apps import AppConfig

class UserAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_auth'

    def ready(self):
        # Crear grupos básicos solo si la DB está lista
        try:
            from django.contrib.auth.models import Group
            Group.objects.get_or_create(name='admin')
            Group.objects.get_or_create(name='usuario')
        except Exception:
            # Durante migraciones la BD puede no estar lista; ignorar errores aquí
            pass
