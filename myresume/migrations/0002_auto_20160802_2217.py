# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-02 22:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='person_birthday',
            field=models.DateTimeField(verbose_name='Birthday'),
        ),
    ]
