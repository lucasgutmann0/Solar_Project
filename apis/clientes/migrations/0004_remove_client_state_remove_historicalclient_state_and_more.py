# Generated by Django 4.0.5 on 2022-07-12 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0003_alter_client_state_alter_historicalclient_state'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='state',
        ),
        migrations.RemoveField(
            model_name='historicalclient',
            name='state',
        ),
        migrations.AddField(
            model_name='client',
            name='status',
            field=models.CharField(choices=[(0, 'active'), (1, 'inactive')], default=0, max_length=10),
        ),
        migrations.AddField(
            model_name='historicalclient',
            name='status',
            field=models.CharField(choices=[(0, 'active'), (1, 'inactive')], default=0, max_length=10),
        ),
    ]