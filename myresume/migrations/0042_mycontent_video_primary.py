# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-08 23:00
from __future__ import unicode_literals

from django.db import migrations
import django_filepicker.models


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0041_remove_contact_captcha'),
    ]

    operations = [
        migrations.AddField(
            model_name='mycontent',
            name='video_primary',
            field=django_filepicker.models.FPUrlField(blank=True),
        ),
    ]
