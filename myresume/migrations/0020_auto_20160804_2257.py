# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-04 22:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0019_auto_20160804_2140'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mycontent',
            name='id',
        ),
        migrations.AlterField(
            model_name='mycontent',
            name='slug',
            field=models.SlugField(max_length=255, primary_key=True, serialize=False),
        ),
    ]
