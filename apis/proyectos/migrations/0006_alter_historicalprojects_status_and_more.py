# Generated by Django 4.0.5 on 2022-07-12 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyectos', '0005_alter_historicalprojects_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalprojects',
            name='status',
            field=models.CharField(choices=[(0, 'active'), (1, 'inactive')], default=0, max_length=10),
        ),
        migrations.AlterField(
            model_name='projects',
            name='status',
            field=models.CharField(choices=[(0, 'active'), (1, 'inactive')], default=0, max_length=10),
        ),
    ]
