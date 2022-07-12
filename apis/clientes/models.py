from tabnanny import verbose
from django.db import models
from simple_history.models import HistoricalRecords

from apis.base.models import BaseModel
# Create your models here.

class Client(BaseModel):
    name = models.CharField('Client Name ', max_length=100, unique=True, blank=False, null=False)
    contract = models.IntegerField('Id Contract', blank=False, null=False)
    historical = HistoricalRecords()
    
    def __str__(self):
        return f'{self.name} - {self.contract}'
    
    @property
    def _history_user(self):
        return self.changed_by
    
    @_history_user.setter
    def _history_user(self, value):
        self.change_by = value
        
    class Meta:
        verbose_name = 'Client'
        verbose_name_plural = 'Clients'


