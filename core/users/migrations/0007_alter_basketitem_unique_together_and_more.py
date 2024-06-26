# Generated by Django 5.0.3 on 2024-05-16 13:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_basketitem_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='basketitem',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='basketitem',
            name='book',
        ),
        migrations.RemoveField(
            model_name='basketitem',
            name='user',
        ),
        migrations.AlterUniqueTogether(
            name='bookcomment',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='bookcomment',
            name='book',
        ),
        migrations.RemoveField(
            model_name='bookcomment',
            name='user',
        ),
        migrations.AlterUniqueTogether(
            name='wishitem',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='wishitem',
            name='book',
        ),
        migrations.RemoveField(
            model_name='wishitem',
            name='user',
        ),
        migrations.DeleteModel(
            name='AuthComment',
        ),
        migrations.DeleteModel(
            name='BasketItem',
        ),
        migrations.DeleteModel(
            name='BookComment',
        ),
        migrations.DeleteModel(
            name='WishItem',
        ),
    ]
