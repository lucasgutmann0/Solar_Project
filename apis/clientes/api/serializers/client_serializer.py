from apis.clientes.models import Client
from rest_framework import serializers



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        exclude = ['status']
        # fields = '__all__'
        
    def to_representation(self, instance):
        return {
            "id": instance.id,
            "name": instance.name,
            "contract": instance.contract,
            "status": instance.status,
            "creation_date": instance.creation_date,
        }
