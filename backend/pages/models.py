from django.db import models


class SingletonModel(models.Model):
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class HeroSection(SingletonModel):
    badge_text = models.CharField(max_length=60, default="Bengaluru · Est. 2014")

    heading_line1 = models.CharField(max_length=60, default="Forge a body")
    heading_line2 = models.CharField(max_length=60, default="built to last")

    description = models.TextField(
        default="A members-only strength club with elite equipment, data-driven "
        "programming and coaches who know your name. Your first session is on us."
    )

    cta_text = models.CharField(max_length=30, default="Book on WhatsApp")
    cta_link = models.CharField(max_length=200, default="https://wa.me/919876543210")

    background_image = models.ImageField(upload_to="hero/", blank=True, null=True)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def __str__(self):
        return "Hero Section"


class AboutSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="Who We Are")
    heading = models.CharField(
        max_length=150, default="A strength club, not a treadmill warehouse"
    )
    description = models.TextField(
        default="IronForge was built by competitive lifters who were tired of "
        "crowded floors and coaches who count reps from behind a desk."
    )
    image = models.ImageField(upload_to="about/", blank=True, null=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Section"

    def __str__(self):
        return "About Section"


class AboutStat(models.Model):
    about_section = models.ForeignKey(
        AboutSection, related_name="stats", on_delete=models.CASCADE
    )
    display_value = models.CharField(max_length=20, help_text="e.g. 14,000 or 50+")
    label = models.CharField(max_length=40, help_text="e.g. Sq Ft Floor")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.display_value} — {self.label}"


class AboutFeature(models.Model):
    about_section = models.ForeignKey(
        AboutSection, related_name="features", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=60)
    description = models.CharField(max_length=150)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class ProgramsSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="What We Do")
    heading = models.CharField(max_length=150, default="Programs engineered around you")

    class Meta:
        verbose_name = "Programs Section"
        verbose_name_plural = "Programs Section"

    def __str__(self):
        return "Programs Section"


class Program(models.Model):
    ICON_CHOICES = [
        ("dumbbell", "Dumbbell"),
        ("heart", "Heart Pulse"),
        ("users", "Users"),
        ("flame", "Flame"),
        ("timer", "Timer"),
        ("target", "Target"),
        ("trophy", "Trophy"),
        ("zap", "Zap"),
    ]

    title = models.CharField(max_length=60)
    description = models.CharField(max_length=200)
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default="dumbbell")
    image = models.ImageField(upload_to="programs/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class ProgramFeature(models.Model):
    program = models.ForeignKey(Program, related_name="features", on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text


class Stat(models.Model):
    value = models.DecimalField(
        max_digits=6, decimal_places=1, help_text="e.g. 1200, 18, 24, 4.9"
    )
    suffix = models.CharField(
        max_length=10, blank=True, help_text="e.g. +, /7, ★"
    )
    label = models.CharField(max_length=60, help_text="e.g. Active Members")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Stat"
        verbose_name_plural = "Stats"

    def __str__(self):
        return f"{self.value}{self.suffix} — {self.label}"


class CTASection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="Ready To Transform?")
    heading_before = models.CharField(max_length=40, default="Start your")
    heading_highlight = models.CharField(max_length=40, default="Fitness")
    heading_after = models.CharField(max_length=40, default="journey today")

    subtext = models.CharField(
        max_length=150, default="Flexible memberships. No hidden fees. Cancel anytime."
    )

    cta_text = models.CharField(max_length=30, default="Join Now")
    cta_link = models.CharField(max_length=200, default="#contact")

    image = models.ImageField(upload_to="cta/", blank=True, null=True)

    class Meta:
        verbose_name = "CTA Section"
        verbose_name_plural = "CTA Section"

    def __str__(self):
        return "CTA Section"


class CTAFeature(models.Model):
    cta_section = models.ForeignKey(
        CTASection, related_name="features", on_delete=models.CASCADE
    )
    icon = models.CharField(max_length=20, choices=Program.ICON_CHOICES, default="target")
    title = models.CharField(max_length=40)
    subtitle = models.CharField(max_length=60)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class TestimonialsSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="Member Stories")
    heading = models.CharField(max_length=150, default="Real people. Real results.")

    class Meta:
        verbose_name = "Testimonials Section"
        verbose_name_plural = "Testimonials Section"

    def __str__(self):
        return "Testimonials Section"


class Testimonial(models.Model):
    name = models.CharField(max_length=60)
    role = models.CharField(max_length=40, default="Member")
    quote = models.TextField()
    avatar = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class PricingSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="Membership")
    heading = models.CharField(max_length=150, default="Simple tiers, no lock-in")

    class Meta:
        verbose_name = "Pricing Section"
        verbose_name_plural = "Pricing Section"

    def __str__(self):
        return "Pricing Section"


class PricingPlan(models.Model):
    name = models.CharField(max_length=40)
    price = models.PositiveIntegerField(help_text="In rupees, e.g. 2400")
    period = models.CharField(max_length=20, default="/month")
    is_featured = models.BooleanField(default=False)
    badge_text = models.CharField(max_length=30, default="Most Popular", blank=True)
    cta_text = models.CharField(max_length=30, default="Enquire now")
    cta_link = models.CharField(max_length=200, default="#contact")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class PricingFeature(models.Model):
    plan = models.ForeignKey(PricingPlan, related_name="features", on_delete=models.CASCADE)
    text = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.text


class ContactSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="Enquiry & Support")
    heading = models.CharField(max_length=150, default="Reach us the way you prefer")

    form_intro = models.CharField(
        max_length=150,
        default="Fill this in and we'll open your mail app with everything ready to send.",
    )
    contact_email = models.EmailField(default="hello@ironforge.fit")
    topics = models.TextField(
        default="Membership enquiry\nPersonal training\nCorporate / group\nOther",
        help_text="One topic per line, shown in the enquiry form dropdown",
    )

    address_line = models.CharField(max_length=200, default="IronForge Strength Club, 12 MG Road, Bengaluru 560001")
    opening_hours = models.CharField(max_length=150, default="Mon-Sat 5:00-23:00 · Sun 6:00-14:00")
    maps_query = models.CharField(
        max_length=200,
        default="IronForge Strength Club, 12 MG Road, Bengaluru 560001",
        help_text="Address used to build the embedded map and directions link",
    )

    class Meta:
        verbose_name = "Contact Section"
        verbose_name_plural = "Contact Section"

    def __str__(self):
        return "Contact Section"

    def topics_list(self):
        return [t.strip() for t in self.topics.splitlines() if t.strip()]


class ContactMethod(models.Model):
    ICON_CHOICES = [
        ("phone", "Phone"),
        ("chat", "Chat"),
        ("email", "Email"),
    ]

    contact_section = models.ForeignKey(
        ContactSection, related_name="methods", on_delete=models.CASCADE
    )
    icon = models.CharField(max_length=20, choices=ICON_CHOICES, default="phone")
    title = models.CharField(max_length=40)
    subtitle = models.CharField(max_length=100)
    link_text = models.CharField(max_length=40)
    link_href = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title


class TrainersSection(SingletonModel):
    eyebrow_text = models.CharField(max_length=60, default="The Team")
    heading = models.CharField(max_length=150, default="Coaches who know your name")

    class Meta:
        verbose_name = "Trainers Section"
        verbose_name_plural = "Trainers Section"

    def __str__(self):
        return "Trainers Section"


class Trainer(models.Model):
    name = models.CharField(max_length=60)
    role = models.CharField(max_length=60, help_text="e.g. Head Strength Coach")
    credentials = models.CharField(max_length=100, help_text="e.g. NSCA-CSCS · 11 yrs · Powerlifting")
    image = models.ImageField(upload_to="trainers/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class FooterSection(SingletonModel):
    tagline = models.CharField(max_length=60, default="Stronger Everyday")
    description = models.CharField(
        max_length=200,
        default="IronForge is more than a gym. It's a community built on discipline, dedication and relentless progress.",
    )
    copyright_text = models.CharField(max_length=100, default="© 2026 IronForge Fitness. All rights reserved.")

    class Meta:
        verbose_name = "Footer Section"
        verbose_name_plural = "Footer Section"

    def __str__(self):
        return "Footer Section"


class FooterSocialLink(models.Model):
    ICON_CHOICES = [
        ("instagram", "Instagram"),
        ("facebook", "Facebook"),
        ("youtube", "YouTube"),
        ("twitter", "Twitter / X"),
        ("threads", "Threads"),
    ]

    footer_section = models.ForeignKey(
        FooterSection, related_name="social_links", on_delete=models.CASCADE
    )
    icon = models.CharField(max_length=20, choices=ICON_CHOICES)
    url = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.icon


class FooterQuickLink(models.Model):
    footer_section = models.ForeignKey(
        FooterSection, related_name="quick_links", on_delete=models.CASCADE
    )
    label = models.CharField(max_length=40)
    link = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label


class FooterLegalLink(models.Model):
    footer_section = models.ForeignKey(
        FooterSection, related_name="legal_links", on_delete=models.CASCADE
    )
    label = models.CharField(max_length=40)
    link = models.CharField(max_length=200)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.label
