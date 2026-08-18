from django.contrib import admin
from django.shortcuts import redirect

from .models import (
    AboutFeature,
    AboutSection,
    AboutStat,
    ContactMethod,
    ContactSection,
    CTAFeature,
    CTASection,
    FooterLegalLink,
    FooterQuickLink,
    FooterSection,
    FooterSocialLink,
    HeroSection,
    PricingFeature,
    PricingPlan,
    PricingSection,
    Program,
    ProgramFeature,
    ProgramsSection,
    Stat,
    Testimonial,
    TestimonialsSection,
    Trainer,
    TrainersSection,
)


class SingletonAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = self.model.load()
        url_name = f"admin:{self.model._meta.app_label}_{self.model._meta.model_name}_change"
        return redirect(url_name, obj.pk)


@admin.register(HeroSection)
class HeroSectionAdmin(SingletonAdmin):
    fieldsets = (
        ("Badge", {"fields": ("badge_text",)}),
        ("Heading", {"fields": ("heading_line1", "heading_line2")}),
        ("Description", {"fields": ("description",)}),
        ("Call To Action", {"fields": ("cta_text", "cta_link")}),
        ("Background", {"fields": ("background_image",)}),
    )


class AboutStatInline(admin.TabularInline):
    model = AboutStat
    extra = 1


class AboutFeatureInline(admin.TabularInline):
    model = AboutFeature
    extra = 1


@admin.register(AboutSection)
class AboutSectionAdmin(SingletonAdmin):
    inlines = [AboutStatInline, AboutFeatureInline]
    fieldsets = (
        ("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading")}),
        ("Description", {"fields": ("description",)}),
        ("Image", {"fields": ("image",)}),
    )


@admin.register(ProgramsSection)
class ProgramsSectionAdmin(SingletonAdmin):
    fieldsets = (("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading")}),)


class ProgramFeatureInline(admin.TabularInline):
    model = ProgramFeature
    extra = 1


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    inlines = [ProgramFeatureInline]
    list_display = ("title", "icon", "order")
    list_editable = ("order",)
    ordering = ("order",)
    fieldsets = (
        (None, {"fields": ("title", "description", "icon", "image", "order")}),
    )


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "suffix", "order")
    list_editable = ("value", "suffix", "order")
    ordering = ("order",)


class CTAFeatureInline(admin.TabularInline):
    model = CTAFeature
    extra = 1


@admin.register(CTASection)
class CTASectionAdmin(SingletonAdmin):
    inlines = [CTAFeatureInline]
    fieldsets = (
        ("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading_before", "heading_highlight", "heading_after")}),
        ("Subtext", {"fields": ("subtext",)}),
        ("Call To Action", {"fields": ("cta_text", "cta_link")}),
        ("Image", {"fields": ("image",)}),
    )


@admin.register(TestimonialsSection)
class TestimonialsSectionAdmin(SingletonAdmin):
    fieldsets = (("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading")}),)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")
    list_editable = ("role", "order")
    ordering = ("order",)


@admin.register(PricingSection)
class PricingSectionAdmin(SingletonAdmin):
    fieldsets = (("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading")}),)


class PricingFeatureInline(admin.TabularInline):
    model = PricingFeature
    extra = 1


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    inlines = [PricingFeatureInline]
    list_display = ("name", "price", "is_featured", "order")
    list_editable = ("price", "is_featured", "order")
    ordering = ("order",)
    fieldsets = (
        (None, {"fields": ("name", "price", "period", "order")}),
        ("Featured", {"fields": ("is_featured", "badge_text")}),
        ("Call To Action", {"fields": ("cta_text", "cta_link")}),
    )


class ContactMethodInline(admin.TabularInline):
    model = ContactMethod
    extra = 1


@admin.register(ContactSection)
class ContactSectionAdmin(SingletonAdmin):
    inlines = [ContactMethodInline]
    fieldsets = (
        ("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading")}),
        ("Enquiry Form", {"fields": ("form_intro", "contact_email", "topics")}),
        ("Location", {"fields": ("address_line", "opening_hours", "maps_query")}),
    )


@admin.register(TrainersSection)
class TrainersSectionAdmin(SingletonAdmin):
    fieldsets = (("Eyebrow & Heading", {"fields": ("eyebrow_text", "heading")}),)


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")
    list_editable = ("role", "order")
    ordering = ("order",)
    fieldsets = ((None, {"fields": ("name", "role", "credentials", "image", "order")}),)


class FooterSocialLinkInline(admin.TabularInline):
    model = FooterSocialLink
    extra = 1


class FooterQuickLinkInline(admin.TabularInline):
    model = FooterQuickLink
    extra = 1


class FooterLegalLinkInline(admin.TabularInline):
    model = FooterLegalLink
    extra = 1


@admin.register(FooterSection)
class FooterSectionAdmin(SingletonAdmin):
    inlines = [FooterSocialLinkInline, FooterQuickLinkInline, FooterLegalLinkInline]
    fieldsets = (
        ("Brand", {"fields": ("tagline", "description")}),
        ("Copyright", {"fields": ("copyright_text",)}),
    )
