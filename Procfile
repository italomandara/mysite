web: python manage.py collectstatic --noinput;python manage.py migrate;python manage.py dumpdata > db_live.json;python manage.py compress --force;gunicorn mysite.wsgi

