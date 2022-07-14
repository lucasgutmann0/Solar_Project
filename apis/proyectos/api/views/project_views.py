from rest_framework import generics, status
from rest_framework.response import Response


from apis.base.api.api import GeneralListApiView
from apis.proyectos.api.serializers.project_serializer import ProjectSerializer
from apis.proyectos.models import Projects

# listado de proyectos
class ProjectListAPIView(GeneralListApiView):
    serializer_class = ProjectSerializer

# creacion de proyecto    
class ProjectCreateAPIView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        return Projects.objects.all()
    

class ProjectRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        return Projects.objects.all()
    
class ProjectDestroyAPIView(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        return Projects.objects.all()
    
    def destroy(self, request, pk=None):
        project = self.get_queryset().filter(id = pk).first()
        if project:
            project.delete() 
            return Response({'message': 'Project has been Deleated successfully'}, status = status.HTTP_200_OK)
        else:
            return Response({'message': "Project Doesn't exist in database"}, status = status.HTTP_400_BAD_REQUEST)
    
class ProjectDeactivateAPIView(generics.DestroyAPIView):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
        return Projects.objects.all()
    
    def delete(self,request,pk=None ):
        project = self.get_queryset().filter(id = pk).first()
        if project:
            project.status = False
            project.save()
            return Response({'message': 'Project has been deactivated successfully'}, status = status.HTTP_200_OK)
        else:
            return Response({'message': "Project Doesn't exist"}, status = status.HTTP_400_BAD_REQUEST)
    
        