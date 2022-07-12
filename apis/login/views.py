from email import message
from email.mime.multipart import MIMEMultipart
from rest_framework import status
from rest_framework.response import Response
from django.template.loader import render_to_string
from email.mime.text import MIMEText
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from apis.login.models import User
import smtplib
from Solaris_project import settings
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from .serializers import CustomTokenObtainPairSerializer
from django.contrib.auth import authenticate


class userViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer
    queryset = User.objects.all()


    def send_email(destinatario, subject):

        try:
            mailServer = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
            mailServer.ehlo()
            mailServer.starttls()
            mailServer.ehlo()
            mailServer.login(settings.EMAIL_HOST_USER,settings.EMAIL_HOST_PASSWORD)

            # Construimos el mensaje simple
            mensaje = MIMEMultipart()
            mensaje['From'] = settings.EMAIL_HOST_USER
            mensaje['To'] = destinatario
            mensaje['Subject'] = subject

            content = render_to_string('send_email.html')
            mensaje.attach(MIMEText(content, 'html'))

            # Envio del mensaje
            mailServer.sendmail(settings.EMAIL_HOST_USER,destinatario, mensaje.as_string())
            print('Todo es correcto')

        except Exception as e:
            print('entro al except')
            print(e)




class UserRegisterAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "creamos melosos"},status=status.HTTP_200_OK)
        return Response({'message':"paila mi so"}, status=status.HTTP_400_BAD_REQUEST)

class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(
            username=username,
            password=password
        )
        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user_serializer = UserSerializer(user)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh-token': login_serializer.validated_data.get('refresh'),
                    'user': user_serializer.data,
                    'message': 'Inicio De Sesion Exitosa'
                },status = status.HTTP_200_OK) 
            return Response({'error': 'Contraseña o Nombre De Usuario Incorrectos'}, status = status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Contraseña o Nombre De Usuario Incorrectos'}, status = status.HTTP_400_BAD_REQUEST)

class Logout(GenericAPIView):
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.data.get('user', 0))
        if user.exists():
            RefreshToken.for_user(user.first())
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        return Response({'error': 'No existe este usuario.'}, status=status.HTTP_400_BAD_REQUEST)