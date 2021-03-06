# Generated by Django 3.2.8 on 2021-10-22 13:38

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContainerModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('order_id', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('route', models.CharField(max_length=300)),
                ('desciption', models.TextField(blank=True, null=True)),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('last_update', models.DateTimeField(auto_now=True)),
                ('category', models.IntegerField(default=0)),
                ('container', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apps.containermodel')),
            ],
        ),
        migrations.CreateModel(
            name='PackageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_time', models.DateField()),
                ('data', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.FloatField(), size=4), size=4)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='apps.ordermodel')),
            ],
        ),
    ]
