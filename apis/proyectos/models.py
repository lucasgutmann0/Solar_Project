from unicodedata import name
from django.db import models

from simple_history.models import HistoricalRecords
from apis.base.models import BaseModel
from apis.clientes.models import Client

# Create your models here.
class Projects(BaseModel):
    """Model definition for Proyecto."""

    # TODO: Define fields here
    fk_clients = models.ForeignKey("clientes.Client", on_delete=models.CASCADE)
    installed_power = models.IntegerField("Installed Power", blank=False, null=False)
    address = models.CharField("Address", max_length=100, blank=False, null=False)
    latitude = models.FloatField("Latitude", blank=False, null=False)
    longitude = models.FloatField("Longitude", blank=False, null=False)
    historical = HistoricalRecords()

    def __str__(self):
        return f"{self.fk_clients} - {self.address}"

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.change_by = value

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
