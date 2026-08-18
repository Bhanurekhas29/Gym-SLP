from django.contrib import admin
from django.shortcuts import redirect

from .models import NavLink, SiteSettings


class NavLinkInline(admin.TabularInline):
    model = NavLink
    extra = 1


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    inlines = [NavLinkInline]
    fieldsets = (
        ("Website Theme", {"fields": ("theme",)}),
        ("Navbar Branding", {"fields": ("logo_text_primary", "logo_text_secondary", "phone_number")}),
        ("Navbar Call To Action", {"fields": ("cta_text", "cta_link")}),
        ("Floating Contact Buttons", {"fields": ("whatsapp_link",)}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = SiteSettings.load()
        return redirect("admin:sitesettings_sitesettings_change", obj.pk)
