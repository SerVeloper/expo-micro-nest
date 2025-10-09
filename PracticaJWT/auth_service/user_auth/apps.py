from django.apps import AppConfig


class UserAuthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'user_auth'

    def ready(self):
        from django.contrib.auth.models import Group
        Group.objects.get_or_create(name='admin')
