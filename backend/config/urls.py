from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from django.views.static import serve as serve_static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('sitesettings.urls')),
    path('api/', include('pages.urls')),
]

# django.conf.urls.static.static() is a no-op when DEBUG=False, but this
# project serves media directly from Django in production too (no S3/CDN),
# so register the route explicitly instead of relying on that helper.
urlpatterns += [
    re_path(
        r'^%s(?P<path>.*)$' % settings.MEDIA_URL.lstrip('/'),
        serve_static,
        {'document_root': settings.MEDIA_ROOT},
    ),
]

# Serve the built React app for every other route (client-side routing fallback).
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
