from django.urls import path

from .views import (
    AboutSectionView,
    ContactSectionView,
    CTASectionView,
    FooterSectionView,
    HeroSectionView,
    PricingSectionView,
    ProgramsSectionView,
    StatListView,
    TestimonialsSectionView,
    TrainersSectionView,
)

urlpatterns = [
    path("hero/", HeroSectionView.as_view(), name="hero-section"),
    path("stats/", StatListView.as_view(), name="stats"),
    path("about/", AboutSectionView.as_view(), name="about-section"),
    path("programs/", ProgramsSectionView.as_view(), name="programs-section"),
    path("cta/", CTASectionView.as_view(), name="cta-section"),
    path("testimonials/", TestimonialsSectionView.as_view(), name="testimonials-section"),
    path("pricing/", PricingSectionView.as_view(), name="pricing-section"),
    path("contact/", ContactSectionView.as_view(), name="contact-section"),
    path("trainers/", TrainersSectionView.as_view(), name="trainers-section"),
    path("footer/", FooterSectionView.as_view(), name="footer-section"),
]
