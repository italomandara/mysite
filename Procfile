web: rm debug.log; python manage.py migrate;python manage.py dumpdata > db_live.json;manage.py dumpdata myresume > mr_live.json; python manage.py collectstatic --clear --noinput; gunicorn mysite.wsgi

