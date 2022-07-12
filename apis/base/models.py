from datetime import datetime
from pyexpat import model
from django.db import models

# Create your models here.
class BaseModel(models.Model):

    # definicion de campos
    id = models.AutoField(primary_key=True)
    state = models.BooleanField("Activo", default=True)
    creation_date = models.DateTimeField("Creation Date", auto_now_add=True, auto_now=False)
    modification_date = models.DateTimeField("Modification Date", auto_now_add=False, auto_now=True)
    modification_date = models.DateTimeField("Modification Date", auto_now_add=False, auto_now=True)

    class Meta:
        abstract = True
        verbose_name = "Modelo Base"
        verbose_name_plural = "Modelos Base"
