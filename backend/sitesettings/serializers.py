from rest_framework import serializers

from .models import NavLink, SiteSettings


class NavLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavLink
        fields = ["label", "link"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    nav_links = NavLinkSerializer(many=True, read_only=True)

    class Meta:
        model = SiteSettings
        fields = [
            "theme",
            "logo_text_primary",
            "logo_text_secondary",
            "phone_number",
            "whatsapp_link",
            "cta_text",
            "cta_link",
            "nav_links",
        ]
