# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-23 15:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0030_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='category',
            field=models.CharField(choices=[('TC', 'Technology'), ('LF', 'Life'), ('CS', 'Courses'), ('CD', 'Coding')], default='LF', max_length=2),
        ),
        migrations.AlterField(
            model_name='post',
            name='tag',
            field=models.CharField(max_length=50),
        ),
    ]
