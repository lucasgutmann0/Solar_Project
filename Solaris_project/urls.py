from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from apis.login.views import UserRegisterAPIView, userViewSet, Login, Logout
from rest_framework.routers import DefaultRouter


urlpatterns = [
    # user
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', UserRegisterAPIView.as_view(), name='user_register'),
    path('logout/',Logout.as_view(),name='logout'),
    path('login/',Login.as_view(),name='login'),
    
    # projects
    path('project/', include('apis.proyectos.api.urls')),
    
    # clients
    path('client/', include('apis.clientes.api.urls'))
]

router = DefaultRouter()
router.register('user', userViewSet, basename='user')
urlpatterns += router.urls