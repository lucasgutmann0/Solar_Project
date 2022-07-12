from rest_framework import generics, status
from rest_framework.response import Response

from apis.base.api.api import GeneralListApiView
from apis.proyectos.api.serializers.project_serializer import ProjectSerializer

class ProjectListAPIView(GeneralListApiView):
    serializer_class = ProjectSerializer
    
class ProjectCreateAPIView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    
    def post(self, request):
        serializer = self.get_serializer()
        serializer = serializer(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Proyecto Creado Correctamente'}, status = status.HTTP_201_CREATED)
        