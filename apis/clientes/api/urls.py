from django.urls import path
from apis.clientes.api.views.client_views import ClientListAPIView, ClientCreateAPIView

urlpatterns = [
    path('list/', ClientListAPIView.as_view()),
    path('create/', ClientCreateAPIView.as_view())
    
]