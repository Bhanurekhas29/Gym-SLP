from .models import NavLink, SiteSettings


def run():
    s = SiteSettings.load()
    s.theme = "dark"
    s.logo_text_primary = "IRON"
    s.logo_text_secondary = "FORGE"
    s.phone_number = "+91 98765 43210"
    s.cta_text = "Free Trial"
    s.cta_link = "#contact"
    s.save()

    if not s.nav_links.exists():
        links = [
            ("About", "#about"),
            ("Programs", "#programs"),
            ("Timetable", "#timetable"),
            ("Trainers", "#trainers"),
            ("Pricing", "#pricing"),
            ("FAQ", "#faq"),
        ]
        for i, (label, link) in enumerate(links):
            NavLink.objects.create(site_settings=s, label=label, link=link, order=i)
