# Generated by Django 5.0.3 on 2024-04-06 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
            options={
                'verbose_name': 'Tag',
                'verbose_name_plural': 'Tags',
            },
        ),
        migrations.CreateModel(
            name='Books',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('thumbnail', models.ImageField(upload_to='images/books/thumbnail/')),
                ('file', models.FileField(blank=True, null=True, upload_to='books/')),
                ('release_date', models.DateField()),
                ('authors', models.ManyToManyField(related_name='books', to='authors.authors')),
                ('tags', models.ManyToManyField(related_name='books', to='books.tags')),
            ],
            options={
                'verbose_name': 'Book',
                'verbose_name_plural': 'Books',
                'permissions': (('view', 'User can view file of book'),),
            },
        ),
    ]