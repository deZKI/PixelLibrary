# Generated by Django 5.0.3 on 2024-05-14 13:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_users_patronymic'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='phone_numer',
            new_name='phone_number',
        ),
    ]