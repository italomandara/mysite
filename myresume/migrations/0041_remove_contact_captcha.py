# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-06 21:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myresume', '0040_contact_captcha'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='captcha',
        ),
    ]
