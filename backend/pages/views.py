from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AboutSection,
    ContactSection,
    CTASection,
    FooterSection,
    HeroSection,
    PricingSection,
    ProgramsSection,
    Stat,
    TestimonialsSection,
    TrainersSection,
)
from .serializers import (
    AboutSectionSerializer,
    ContactSectionSerializer,
    CTASectionSerializer,
    FooterSectionSerializer,
    HeroSectionSerializer,
    PricingSectionSerializer,
    ProgramsSectionSerializer,
    StatSerializer,
    TestimonialsSectionSerializer,
    TrainersSectionSerializer,
)


class HeroSectionView(APIView):
    def get(self, request):
        obj = HeroSection.load()
        return Response(HeroSectionSerializer(obj, context={"request": request}).data)


class StatListView(ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer


class AboutSectionView(APIView):
    def get(self, request):
        obj = AboutSection.load()
        return Response(AboutSectionSerializer(obj, context={"request": request}).data)


class ProgramsSectionView(APIView):
    def get(self, request):
        obj = ProgramsSection.load()
        return Response(ProgramsSectionSerializer(obj, context={"request": request}).data)


class CTASectionView(APIView):
    def get(self, request):
        obj = CTASection.load()
        return Response(CTASectionSerializer(obj, context={"request": request}).data)


class TestimonialsSectionView(APIView):
    def get(self, request):
        obj = TestimonialsSection.load()
        return Response(TestimonialsSectionSerializer(obj, context={"request": request}).data)


class PricingSectionView(APIView):
    def get(self, request):
        obj = PricingSection.load()
        return Response(PricingSectionSerializer(obj, context={"request": request}).data)


class ContactSectionView(APIView):
    def get(self, request):
        obj = ContactSection.load()
        return Response(ContactSectionSerializer(obj, context={"request": request}).data)


class TrainersSectionView(APIView):
    def get(self, request):
        obj = TrainersSection.load()
        return Response(TrainersSectionSerializer(obj, context={"request": request}).data)


class FooterSectionView(APIView):
    def get(self, request):
        obj = FooterSection.load()
        return Response(FooterSectionSerializer(obj, context={"request": request}).data)
