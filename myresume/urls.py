from django.conf.urls import include, url
from django.http import HttpResponse
from . import views, viewsets
from .routers import *

urlpatterns = [
    url(r'^$', views.index_vue, name='index_vue'),
    # url(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'api/', include(router.urls), name='api'),
    url(r'api/categories/', AllCategoryViewSet.as_view(), name='all_categories'),
    url(r'api/s/', SettingsViewSet.as_view(), name='settings'),
    url(r'^google96ecc24c7541190c\.html$', lambda r: HttpResponse("google-site-verification: google96ecc24c7541190c.html", content_type="text/plain")),
    url(r'^robots\.txt$', lambda r: HttpResponse("User-agent: *\nDisallow: ", content_type="text/plain")),
    url(r'^sitemap\.xml$', lambda r: HttpResponse('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> <url> <loc>http://itmandar.herokuapp.com/</loc> <changefreq>daily</changefreq> <priority>1.0</priority> </url> <url> <loc>http://itmandar.herokuapp.com/#!/more</loc> <changefreq>daily</changefreq> <priority>1.0</priority> </url> <url> <loc>http://itmandar.herokuapp.com/#!/thoughts</loc> <changefreq>daily</changefreq> <priority>1.0</priority> </url> </urlset> ', content_type="text/xml")),
]