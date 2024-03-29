"""
Django settings for singchro project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-3nsitia1x&$mf*@wa%y=xyqa_5sf=6afd911%dbvg=7+2!6mgn'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    ## app
    'restapi',
    'accounts',

    'rest_framework',

    ## dj-rest-auth
    # 'rest_framework',
    'rest_framework.authtoken',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    ## dj-rest-auth
    'dj_rest_auth',

    ## dj_rest_auth.registration
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
    
]

# dj_rest_auth.registration
SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'singchro.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'singchro.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

# EC2
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # mysqlclient librarly 설치
        'NAME': 'singchro',
        'USER': 'root',
        'PASSWORD': 'a404authorized', # mariaDB 설치 시 입력한 root 비밀번호 입력
        'HOST': 'db',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',  # Use utf8mb4 for full Unicode support
        }
    }
}

#local
# DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': BASE_DIR / 'db.sqlite3',
#    }
# }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = '/srv/server/static/'
#STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication'
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10, 
}

# dj-rest-auth settings
DJANGO_AUTHENTICATION_CLASSES = (
    'dj_rest_auth.authentication.AllAuthJWTAuthentication',
)

AWS_REGION = 'us-east-1'
AWS_STORAGE_BUCKET_NAME = 'ssafy404found'
AWS_QUERYSTRING_AUTH = False
AWS_ACCESS_KEY_ID = 'AKIA4WPAAPLL77NWWR6W'
AWS_SECRET_ACCESS_KEY = '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'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'


# dj-rest-auth configuration
REST_AUTH = {
    'REGISTER_SERIALIZER': 'dj_rest_auth.registration.serializers.RegisterSerializer',
}

# use costomUser
AUTH_USER_MODEL = 'accounts.User'

import firebase_admin
from firebase_admin import credentials
import os

# Firebase Admin SDK 초기화
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# JSON 파일의 절대 경로 설정
JSON_KEY_FILE = os.path.join(BASE_DIR, 'singchro', 'key', 'a404-singchro-1a28e631aa61.json')
cred = credentials.Certificate(JSON_KEY_FILE)

firebase_admin.initialize_app(cred)

# STMP
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "singchro@gmail.com"
EMAIL_HOST_PASSWORD = "iadt cmbw yivo rksh"
EMAIL_USE_TLS = True
