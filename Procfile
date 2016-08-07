web: ./manage.py loaddata mr.json;echo "from django.contrib.auth.models import User; User.objects.create_superuser('italo', 'italomandara@gmail.com', 'ventisei091940')" | python manage.py shell;gunicorn mysite.wsgi

