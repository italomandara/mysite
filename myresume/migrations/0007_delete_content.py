# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-04 20:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0006_content'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Content',
        ),
    ]
