from django.urls import path
from apis.proyectos.api.views.project_views import ProjectListAPIView, ProjectCreateAPIView

urlpatterns = [
    path('list/',ProjectListAPIView.as_view()),
    path('create/',ProjectCreateAPIView.as_view()),
]