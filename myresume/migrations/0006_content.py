# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-04 20:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0005_auto_20160803_2247'),
    ]

    operations = [
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=50)),
                ('h1', models.CharField(max_length=200)),
                ('h2', models.CharField(max_length=200)),
                ('body', models.TextField(max_length=5000)),
                ('h1_it', models.CharField(max_length=200)),
                ('h2_it', models.CharField(max_length=200)),
                ('body_it', models.TextField(max_length=5000)),
                ('layout_class', models.CharField(max_length=50)),
            ],
        ),
    ]
