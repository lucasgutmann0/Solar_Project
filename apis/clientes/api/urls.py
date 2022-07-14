from django.urls import path
from apis.clientes.api.views.client_views import ClientDeactivateAPIView, ClientDestroyAPIView, ClientListAPIView, ClientCreateAPIView, ClientRetrieveAPIView

urlpatterns = [
    path('list/', ClientListAPIView.as_view()),
    path('create/', ClientCreateAPIView.as_view()),
    path('detail/<int:pk>', ClientRetrieveAPIView.as_view()),
    path('destroy/<int:pk>', ClientDestroyAPIView.as_view()),
    path('deactivate/<int:pk>', ClientDeactivateAPIView.as_view()),
]