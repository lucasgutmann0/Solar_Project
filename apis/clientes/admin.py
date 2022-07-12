from django.contrib import admin
from apis.clientes.models import Client


class ClientAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'contract')

# Register your models here.
admin.site.register(Client, ClientAdmin)

