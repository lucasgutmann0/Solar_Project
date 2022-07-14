from django.urls import path
from apis.proyectos.api.views.project_views import ProjectDeactivateAPIView, ProjectDestroyAPIView, ProjectListAPIView, ProjectCreateAPIView, ProjectRetrieveAPIView

urlpatterns = [
    path('list/',ProjectListAPIView.as_view()),
    path('create/',ProjectCreateAPIView.as_view()),
    path('detail/<int:pk>', ProjectRetrieveAPIView.as_view()),
    path('destroy/<int:pk>', ProjectDestroyAPIView.as_view()),
    path('deactivate/<int:pk>', ProjectDeactivateAPIView.as_view()),
]