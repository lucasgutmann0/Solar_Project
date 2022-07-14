from rest_framework import serializers

from apis.clientes.models import Client
from apis.clientes.api.serializers.client_serializer import ClientSerializer
from apis.proyectos.models import Projects

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        exclude = ['status']
        
    def to_representation(self, instance):
        return {
            'id': instance.id,
            "fk_clients": instance.fk_clients.name,
            "status": instance.status,
            "creation_date": instance.creation_date,
            "installed_power": instance.installed_power,
            "address": instance.address,
            "latitude": instance.latitude,
            "longitude": instance.longitude
        }