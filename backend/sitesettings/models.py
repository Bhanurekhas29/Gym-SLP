from django.core.exceptions import ValidationError
from django.db import models


class SiteSettings(models.Model):
    THEME_CHOICES = [
        ("light", "Light"),
        ("dark", "Dark"),
    ]

    theme = models.CharField(max_length=5, choices=THEME_CHOICES, default="dark")

    logo_text_primary = models.CharField(max_length=30, default="IRON")
    logo_text_secondary = models.CharField(max_length=30, default="FORGE")

    phone_number = models.CharField(max_length=30, blank=True)
    whatsapp_link = models.CharField(max_length=200, blank=True, default="https://wa.me/919876543210")

    cta_text = models.CharField(max_length=30, default="Free Trial")
    cta_link = models.CharField(max_length=200, default="#contact")

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    def clean(self):
        if SiteSettings.objects.exclude(pk=self.pk).exists():
            raise ValidationError("Only one Site Settings instance is allowed.")

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Site Settings"


class NavLink(models.Model):
    site_settings = models.ForeignKey(
        SiteSettings, related_name="nav_links", on_delete=models.CASCADE
    )
    label = models.CharField(max_length=30)
    link = models.CharField(max_length=200, help_text="e.g. #about or /programs")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label
