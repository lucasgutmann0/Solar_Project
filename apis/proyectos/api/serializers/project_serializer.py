from rest_framework import serializers

from apis.clientes.models import Client
from apis.clientes.api.serializers.client_serializer import ClientSerializer
from apis.proyectos.models import Projects

class ProjectSerializer(serializers.ModelSerializer):
    # fk_clients = serializers.StringRelatedField()
    
    class Meta:
        model = Projects
        exclude = ['state']
        
    def to_representation(self, instance):
        return {
            'id': instance.id,
            "fk_clients": instance.fk_clients.name,
            "state": instance.state,
            "creation_date": instance.creation_date,
            "installed_power": instance.installed_power,
            "address": instance.address,
            "latitude": instance.latitude,
            "longitude": instance.longitude
        }