"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 1.10.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os
import socket

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_PATH = os.path.dirname(__file__)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '80s8*6n!6iijjuymo(x-+xt(26n%4x6&i2c-h*a(xiq45b5syw'

# SECURITY WARNING: don't run with debug turned on in production!


if socket.gethostname() != 'it.local':
    DEBUG = False
else:
    DEBUG = True

TEMPLATE_DEBUG = DEBUG


ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', 'itmandar.herokuapp.com']


# Application definition

INSTALLED_APPS = [
    'myresume.apps.MyresumeConfig',
    'sass_processor',
    'django_markup',
    'template_repl',
    'compressor',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'myresume/templates/')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'mysite',
        'USER': 'it',
        'PASSWORD': 'ventisei091940',
        'HOST': 'localhost',
        'PORT': '',
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/



# sass processor settings
SASS_PROCESSOR_ROOT = os.path.join(ROOT_PATH, 'static')

# Update database configuration with $DATABASE_URL.

import dj_database_url
db_from_env = dj_database_url.config()
DATABASES['default'].update(db_from_env)

# Simplified static file serving.
# https://warehouse.python.org/project/whitenoise/

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, "static")
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATICFILES_DIRS = [
    # os.path.join(ROOT_PATH, 'static'),
    os.path.join(PROJECT_ROOT, 'static'),
]


# Extra places for collectstatic to find static files.
# STATICFILES_DIRS = (
#     os.path.join(PROJECT_ROOT, 'static'),
# )

#sass processor
SASS_PROCESSOR_ENABLED = True
SASS_PRECISION = 8

# compressor
COMPRESS_ENABLED = DEBUG

if socket.gethostname() == 'it.local':

    #sass processor
    SASS_PROCESSOR_ENABLED = True
    SASS_OUTPUT_STYLE = 'nested'
else:
    SASS_OUTPUT_STYLE = 'compressed'

if socket.gethostname() != 'it.local':
    COMPRESS_OFFLINE = True
else:
    COMPRESS_OFFLINE = False

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)

print os.path.join(BASE_DIR, 'myresume/templates/')