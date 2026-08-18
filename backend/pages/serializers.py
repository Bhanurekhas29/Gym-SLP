from rest_framework import serializers

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


class HeroSectionSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = [
            "badge_text",
            "heading_line1",
            "heading_line2",
            "description",
            "cta_text",
            "cta_link",
            "background_image",
        ]

    def get_background_image(self, obj):
        if not obj.background_image:
            return None
        request = self.context.get("request")
        url = obj.background_image.url
        return request.build_absolute_uri(url) if request else url


class AboutStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutStat
        fields = ["display_value", "label"]


class AboutFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutFeature
        fields = ["title", "description"]


class AboutSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    stats = AboutStatSerializer(many=True, read_only=True)
    features = AboutFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = AboutSection
        fields = [
            "eyebrow_text",
            "heading",
            "description",
            "image",
            "stats",
            "features",
        ]

    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class ProgramFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramFeature
        fields = ["text"]


class ProgramSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    features = ProgramFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = ["title", "description", "icon", "image", "features"]

    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class ProgramsSectionSerializer(serializers.ModelSerializer):
    programs = serializers.SerializerMethodField()

    class Meta:
        model = ProgramsSection
        fields = ["eyebrow_text", "heading", "programs"]

    def get_programs(self, obj):
        programs = Program.objects.all()
        return ProgramSerializer(programs, many=True, context=self.context).data


class StatSerializer(serializers.ModelSerializer):
    value = serializers.FloatField()
    decimals = serializers.SerializerMethodField()

    class Meta:
        model = Stat
        fields = ["value", "suffix", "label", "decimals"]

    def get_decimals(self, obj):
        return 1 if obj.value % 1 != 0 else 0


class CTAFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CTAFeature
        fields = ["icon", "title", "subtitle"]


class CTASectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    features = CTAFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = CTASection
        fields = [
            "eyebrow_text",
            "heading_before",
            "heading_highlight",
            "heading_after",
            "subtext",
            "cta_text",
            "cta_link",
            "image",
            "features",
        ]

    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class TestimonialSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ["name", "role", "quote", "avatar"]

    def get_avatar(self, obj):
        if not obj.avatar:
            return None
        request = self.context.get("request")
        url = obj.avatar.url
        return request.build_absolute_uri(url) if request else url


class TestimonialsSectionSerializer(serializers.ModelSerializer):
    testimonials = serializers.SerializerMethodField()

    class Meta:
        model = TestimonialsSection
        fields = ["eyebrow_text", "heading", "testimonials"]

    def get_testimonials(self, obj):
        testimonials = Testimonial.objects.all()
        return TestimonialSerializer(testimonials, many=True, context=self.context).data


class PricingFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingFeature
        fields = ["text"]


class PricingPlanSerializer(serializers.ModelSerializer):
    features = PricingFeatureSerializer(many=True, read_only=True)

    class Meta:
        model = PricingPlan
        fields = [
            "name",
            "price",
            "period",
            "is_featured",
            "badge_text",
            "cta_text",
            "cta_link",
            "features",
        ]


class PricingSectionSerializer(serializers.ModelSerializer):
    plans = serializers.SerializerMethodField()

    class Meta:
        model = PricingSection
        fields = ["eyebrow_text", "heading", "plans"]

    def get_plans(self, obj):
        plans = PricingPlan.objects.all()
        return PricingPlanSerializer(plans, many=True, context=self.context).data


class ContactMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMethod
        fields = ["icon", "title", "subtitle", "link_text", "link_href"]


class ContactSectionSerializer(serializers.ModelSerializer):
    methods = ContactMethodSerializer(many=True, read_only=True)
    topics = serializers.SerializerMethodField()
    maps_embed_url = serializers.SerializerMethodField()
    maps_directions_url = serializers.SerializerMethodField()

    class Meta:
        model = ContactSection
        fields = [
            "eyebrow_text",
            "heading",
            "form_intro",
            "contact_email",
            "topics",
            "address_line",
            "opening_hours",
            "maps_embed_url",
            "maps_directions_url",
            "methods",
        ]

    def get_topics(self, obj):
        return obj.topics_list()

    def get_maps_embed_url(self, obj):
        from urllib.parse import quote

        return f"https://maps.google.com/maps?q={quote(obj.maps_query)}&output=embed"

    def get_maps_directions_url(self, obj):
        from urllib.parse import quote

        return f"https://www.google.com/maps/dir/?api=1&destination={quote(obj.maps_query)}"


class TrainerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Trainer
        fields = ["name", "role", "credentials", "image"]

    def get_image(self, obj):
        if not obj.image:
            return None
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class TrainersSectionSerializer(serializers.ModelSerializer):
    trainers = serializers.SerializerMethodField()

    class Meta:
        model = TrainersSection
        fields = ["eyebrow_text", "heading", "trainers"]

    def get_trainers(self, obj):
        trainers = Trainer.objects.all()
        return TrainerSerializer(trainers, many=True, context=self.context).data


class FooterSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSocialLink
        fields = ["icon", "url"]


class FooterQuickLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterQuickLink
        fields = ["label", "link"]


class FooterLegalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLegalLink
        fields = ["label", "link"]


class FooterSectionSerializer(serializers.ModelSerializer):
    social_links = FooterSocialLinkSerializer(many=True, read_only=True)
    quick_links = FooterQuickLinkSerializer(many=True, read_only=True)
    legal_links = FooterLegalLinkSerializer(many=True, read_only=True)

    class Meta:
        model = FooterSection
        fields = [
            "tagline",
            "description",
            "copyright_text",
            "social_links",
            "quick_links",
            "legal_links",
        ]
