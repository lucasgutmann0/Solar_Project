from rest_framework import generics
from rest_framework import generics, status
from rest_framework.response import Response

from apis.base.api.api import GeneralListApiView
from apis.clientes.models import Client
from apis.clientes.api.serializers.client_serializer import ClientSerializer

class ClientListAPIView(GeneralListApiView):
    serializer_class = ClientSerializer
    
class ClientCreateAPIView(generics.CreateAPIView):
    serializer_class = ClientSerializer
    
    def get_queryset(self):
        return Client.objects.all()
    
    
class ClientRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ClientSerializer
    
    def get_queryset(self):
        return Client.objects.all()
    
class ClientDestroyAPIView(generics.DestroyAPIView):
    serializer_class = ClientSerializer
    
    def get_queryset(self):
        return Client.objects.all()
    
    def destroy(self, request, pk=None):
        Client = self.get_queryset().filter(id = pk).first()
        if Client:
            Client.delete() 
            return Response({'message': 'Client has been Deleated successfully'}, status = status.HTTP_200_OK)
        else:
            return Response({'message': "Client Doesn't exist in database"}, status = status.HTTP_400_BAD_REQUEST)
    
class ClientDeactivateAPIView(generics.DestroyAPIView):
    serializer_class = ClientSerializer
    
    def get_queryset(self):
        return Client.objects.all()
    
    def delete(self,request,pk=None ):
        Client = self.get_queryset().filter(id = pk).first()
        if Client:
            Client.status = False
            Client.save()
            return Response({'message': 'Client has been deactivated successfully'}, status = status.HTTP_200_OK)
        else:
            return Response({'message': "Client Doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)
        
