web: python manage.py collectstatic --noinput;python manage.py migrate;python manage.py dumpdata > db_live.json;manage.py dumpdata myresume > mr_live.json; python manage.py compress;gunicorn mysite.wsgi

