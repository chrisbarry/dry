# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-08-08 07:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SpotAV',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
                ('image', models.ImageField(upload_to='spot-av')),
                ('audio', models.FileField(upload_to='spot-av')),
                ('video', models.FileField(upload_to='spot-av')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]