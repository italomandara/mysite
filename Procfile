web: python manage.py migrate;python manage.py dumpdata > db_live.json;manage.py dumpdata myresume > mr_live.json; python manage.py compress; python manage.py compilescss; python manage.py collectstatic --noinput; gunicorn mysite.wsgi

