from django.db import models

# Create your models here.
class BaseModel(models.Model):
    # definicion de campos
    id = models.AutoField(primary_key=True)
    status = models.BooleanField('Status', default=True)
    creation_date = models.DateField(
        "Creation Date", auto_now_add=True, auto_now=False
    )
    modification_date = models.DateTimeField(
        "Modification Date", auto_now_add=False, auto_now=True
    )
    deletion_date = models.DateTimeField(
        "Deletion Date", auto_now_add=False, auto_now=True
    )

    class Meta:
        abstract = True
        verbose_name = "Modelo Base"
        verbose_name_plural = "Modelos Base"
