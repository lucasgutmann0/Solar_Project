# Generated by Django 4.0.5 on 2022-07-12 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0009_alter_client_status_alter_historicalclient_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='status',
            field=models.CharField(choices=[(0, 'cero'), (1, 'uno')], default='cero', max_length=10),
        ),
        migrations.AlterField(
            model_name='historicalclient',
            name='status',
            field=models.CharField(choices=[(0, 'cero'), (1, 'uno')], default='cero', max_length=10),
        ),
    ]