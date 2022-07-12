from rest_framework import generics

from apis.base.api.api import GeneralListApiView
from apis.clientes.models import Client
from apis.clientes.api.serializers.client_serializer import ClientSerializer

class ClientListAPIView(GeneralListApiView):
    serializer_class = ClientSerializer
    
class ClientCreateAPIView(generics.CreateAPIView):
    serializer_class = ClientSerializer
    
    def get_queryset(self):
        return Client.objects.all()