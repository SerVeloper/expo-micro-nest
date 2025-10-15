# user_auth/urls.py
from django.urls import path
from .views import RegisterView, MyTokenObtainPairView, UserListCreateView, UserRetrieveUpdateDestroyView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # CRUD usuarios
    path('users/', UserListCreateView.as_view(), name='user_list_create'),          # GET (admin) / POST (register)
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user_detail'),  # GET/PUT/DELETE (admin o owner)
]
