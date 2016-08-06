# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-05 23:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0022_auto_20160805_2229'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='body_it',
        ),
        migrations.RemoveField(
            model_name='job',
            name='body_it',
        ),
        migrations.AddField(
            model_name='course',
            name='location',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='job',
            name='location',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]