"""
CV Generator — Clean, modern single-page A4 CV.
Generates EN and NO versions from structured data.

Design: Left accent strip, strong typographic hierarchy,
compact skills section, proper use of whitespace.
"""

import os

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, Color
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

W, H = A4
ML = 22 * mm  # margin left
MR = 18 * mm  # margin right
MT = 16 * mm  # margin top
CW = W - ML - MR  # content width

# ── Colors ──
BLACK = HexColor("#111111")
DARK = HexColor("#2d2d2d")
BODY = HexColor("#3d3d3d")
MUTED = HexColor("#6b7280")
ACCENT = HexColor("#1e40af")  # deep blue
ACCENT_LIGHT = HexColor("#dbeafe")  # very light blue
RULE = HexColor("#e5e7eb")
WHITE = HexColor("#ffffff")

# ── Paragraph Styles ──
STYLE_BODY = ParagraphStyle(
    "body", fontName="Helvetica", fontSize=8.2,
    leading=11.5, textColor=BODY,
)
STYLE_BULLET = ParagraphStyle(
    "bullet", fontName="Helvetica", fontSize=7.8,
    leading=10.8, textColor=BODY, leftIndent=8, bulletIndent=0,
)
STYLE_SKILL_VAL = ParagraphStyle(
    "skill_val", fontName="Helvetica", fontSize=7.8,
    leading=10.5, textColor=BODY,
)


def draw_para(c, y, text, style, max_w=None, x_offset=0):
    """Draw a Paragraph, return new y."""
    p = Paragraph(text, style)
    w, h = p.wrap(max_w or CW, 500)
    p.drawOn(c, ML + x_offset, y - h)
    return y - h - 2


# ── Section Header ──
def section_header(c, y, title):
    y -= 22
    # accent bar behind text
    bar_h = 14
    c.setFillColor(ACCENT)
    c.rect(ML, y - 3, 3, bar_h, fill=1, stroke=0)
    c.setFont("Helvetica-Bold", 8.5)
    c.setFillColor(ACCENT)
    c.drawString(ML + 9, y, title.upper())
    # subtle rule
    c.setStrokeColor(RULE)
    c.setLineWidth(0.5)
    c.line(ML + 9, y - 3, W - MR, y - 3)
    return y - 16


# ── Entry Header (company + role + period) ──
def entry_header(c, y, company, role, period, location=None):
    # Company name
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(BLACK)
    c.drawString(ML, y, company)

    # Period + location on right
    c.setFont("Helvetica", 7.5)
    c.setFillColor(MUTED)
    right_text = period
    if location:
        right_text = f"{period}  ·  {location}"
    c.drawRightString(W - MR, y, right_text)

    # Role
    y -= 11
    c.setFont("Helvetica-Oblique", 8)
    c.setFillColor(MUTED)
    c.drawString(ML, y, role)
    return y - 5


def bullet_point(c, y, text):
    """Draw a bullet point with wrapping text."""
    p = Paragraph(text, STYLE_BULLET)
    w, h = p.wrap(CW - 14, 500)
    p.drawOn(c, ML + 6, y - h)
    # bullet dot
    c.setFillColor(ACCENT)
    c.circle(ML + 3, y - 4, 1.5, fill=1, stroke=0)
    return y - h - 1


def skill_row(c, y, label, value):
    """Draw a skill category row."""
    label_w = 105
    c.setFont("Helvetica-Bold", 7.8)
    c.setFillColor(DARK)
    c.drawString(ML, y, label)

    p = Paragraph(value, STYLE_SKILL_VAL)
    w, h = p.wrap(CW - label_w, 500)
    p.drawOn(c, ML + label_w, y - h + 9.5)
    return y - max(h, 11) - 1.5


def link_text(c, y, url, display=None):
    """Draw a clickable link."""
    y -= 2  # gap from previous element
    display = display or url
    c.setFont("Helvetica", 7.8)
    c.setFillColor(ACCENT)
    tw = c.stringWidth(display, "Helvetica", 7.8)
    c.drawString(ML + 6, y, display)
    # Make it clickable
    c.linkURL(f"https://{url}", (ML + 6, y - 2, ML + 6 + tw, y + 8), relative=0)
    return y - 12


# ── Content Data ──
CONTENT = {
    "en": {
        "tagline": "System Developer  ·  Frontend & Full-Stack",
        "contact_line": "Bergen, Norway  ·  sebastian.rosnes.sorensen@hotmail.com  ·  +47 472 78 212",
        "sections": {
            "experience": "Professional Experience",
            "education": "Education",
            "skills": "Some Technical Skills",
            "other": "Other Experience",
        },
        "experience": [
            {
                "company": "Stacc AS", "role": "System Developer",
                "period": "Jan 2024 – Present", "location": "Bergen",
                "description": "Full-stack developer building credit solutions for consumer and sales finance across the Nordics. React, Next.js, and TypeScript in an agile, self-organized team. CI/CD through GitHub Actions. Responsible for security and compliance within the team. Close collaboration with designers, product owners, and fellow developers.",
                "bullets": [], "link": None,
            },
            {
                "company": "Loreprint AS", "role": "Founder & Solo Developer",
                "period": "2026 – Present", "location": "Bergen",
                "description": "AI-powered platform for TTRPG character portraits with print-on-demand fulfillment. Built the entire platform solo from concept to production — a registered company under SRS Ventures AS.",
                "bullets": [
                    "AI image pipeline: FLUX.2 (Black Forest Labs) generation → Real-ESRGAN upscaling → print-ready processing",
                    "Gelato API integration for print-on-demand (140+ production hubs, 32 countries), automated order creation and webhook tracking",
                    "Stripe Checkout with multi-item cart, VAT handling, and NOK currency",
                    "Full i18n (Norwegian + English) with localized URLs, SEO with JSON-LD structured data and blog engine",
                    "Next.js 16, Supabase (PostgreSQL + RLS + Auth), Cloudflare R2, Vercel, Inngest for async job orchestration",
                ],
                "link": "loreprint.com",
            },
            {
                "company": "Rosengrip", "role": "Co-founder & Developer",
                "period": "2024 – Present", "location": "Bergen",
                "description": "Co-founded a web agency building modern, conversion-focused websites for ambitious businesses. Custom solutions with Next.js, React, and Tailwind CSS.",
                "bullets": [], "link": "rosengrip.no",
            },
        ],
        "education": [
            {
                "institution": "University of Bergen (UiB)",
                "degree": "Bachelor in Computer Science — Data Technology",
                "period": "2021–2023",
                "description": "Programming, data structures, algorithms, system architecture, databases, web development, IT security, and software systems. Team projects in Java, Python, SQL, TypeScript, and React.",
            },
            {
                "institution": "University of Bergen (UiB)",
                "degree": "Software Engineering Master's Courses",
                "period": "2024",
                "description": "Completed required courses in the Software Engineering master's program alongside full-time work at Stacc.",
            },
        ],
        "skills": [
            ("Frontend", "HTML, CSS, JavaScript, TypeScript, React, Next.js 16, Tailwind CSS v4, shadcn/ui, Responsive Design, WCAG/Accessibility"),
            ("Backend", "Node.js, NestJS, Supabase (PostgreSQL + Auth + RLS), Inngest, Zod, REST APIs"),
            ("Cloud & Deploy", "Vercel, Azure, Cloudflare R2, Docker, Kubernetes"),
            ("Payments & Integrations", "Stripe, Gelato API, Black Forest Labs FLUX.2, Brevo, Discord OAuth"),
            ("DevOps & Testing", "GitHub Actions, Jest, Playwright, Storybook, CI/CD, Performance Optimization"),
            ("Tools", "Claude Code, Git, Prisma, Bruno, Postman, Swagger/OpenAPI"),
        ],
        "other_experience": [
            {
                "company": "Home Nursing Bergen", "role": "Assistant",
                "period": "Oct 2022 – May 2025",
                "description": "Practical assistance to elderly and care-dependent individuals.",
            },
            {
                "company": "Coop Norge SA", "role": "Warehouse Associate",
                "period": "Aug 2019 – Dec 2022",
                "description": "Full-time at central warehouse, then part-time at Flesland alongside studies. Leave during military service.",
            },
            {
                "company": "Jegerkompaniet, GSV", "role": "Ranger — Norwegian Armed Forces",
                "period": "Jan 2020 – Jan 2021",
                "description": "Military service as a Ranger at Garnisonen i Sør-Varanger. Live operations on the Russian border. Arctic patrols under demanding conditions.",
            },
        ],
    },
    "no": {
        "tagline": "Systemutvikler  ·  Frontend & Fullstack",
        "contact_line": "Bergen, Norge  ·  sebastian.rosnes.sorensen@hotmail.com  ·  +47 472 78 212",
        "sections": {
            "experience": "Arbeidserfaring",
            "education": "Utdanning",
            "skills": "Noen tekniske ferdigheter",
            "other": "Annen erfaring",
        },
        "experience": [
            {
                "company": "Stacc AS", "role": "Systemutvikler",
                "period": "Jan 2024 – Nå", "location": "Bergen",
                "description": "Fullstack-utvikler i team som utvikler kredittløsninger for forbrukerfinansiering og salgsfinansiering i Norden. React, Next.js og TypeScript i et smidig, selvorganisert team. CI/CD gjennom GitHub Actions. Ansvarlig for sikkerhet og compliance i teamet. Tett samarbeid med designere, produkteiere og andre utviklere.",
                "bullets": [], "link": None,
            },
            {
                "company": "Loreprint AS", "role": "Gründer & eneutvikler",
                "period": "2026 – Nå", "location": "Bergen",
                "description": "AI-drevet plattform for TTRPG-karakterportretter med print-on-demand. Bygget hele plattformen alene fra idé til produksjon — registrert selskap under SRS Ventures AS.",
                "bullets": [
                    "AI-bildepipeline: FLUX.2 (Black Forest Labs) generering → Real-ESRGAN-oppskalering → trykkeklar prosessering",
                    "Gelato API-integrasjon for print-on-demand (140+ produksjonssentre, 32 land), automatisk ordreopprettelse og webhook-sporing",
                    "Stripe Checkout med flervare-handlekurv, MVA-håndtering og NOK-valuta",
                    "Full i18n (norsk + engelsk) med lokaliserte URL-er, SEO med JSON-LD strukturerte data og bloggmotor",
                    "Next.js 16, Supabase (PostgreSQL + RLS + Auth), Cloudflare R2, Vercel, Inngest for asynkron jobborkestrasjon",
                ],
                "link": "loreprint.com",
            },
            {
                "company": "Rosengrip", "role": "Medgründer & utvikler",
                "period": "2024 – Nå", "location": "Bergen",
                "description": "Medgründer av webbyrå som lager moderne, konverterende nettsider for ambisiøse bedrifter. Skreddersydde løsninger med Next.js, React og Tailwind CSS.",
                "bullets": [], "link": "rosengrip.no",
            },
        ],
        "education": [
            {
                "institution": "Universitetet i Bergen (UiB)",
                "degree": "Bachelor i informatikk — Datateknologi",
                "period": "2021–2023",
                "description": "Programmering, datastrukturer, algoritmer, systemarkitektur, databaser, webutvikling, IT-sikkerhet og programvaresystemer. Prosjektarbeid i team med Java, Python, SQL, TypeScript og React.",
            },
            {
                "institution": "Universitetet i Bergen (UiB)",
                "degree": "Fag fra master i programvareutvikling",
                "period": "2024",
                "description": "Obligatoriske fag i Software Engineering-masteren, parallelt med fulltidsjobb hos Stacc.",
            },
        ],
        "skills": [
            ("Frontend", "HTML, CSS, JavaScript, TypeScript, React, Next.js 16, Tailwind CSS v4, shadcn/ui, Responsive Design, WCAG/Accessibility"),
            ("Backend", "Node.js, NestJS, Supabase (PostgreSQL + Auth + RLS), Inngest, Zod, REST API-er"),
            ("Sky & deploy", "Vercel, Azure, Cloudflare R2, Docker, Kubernetes"),
            ("Betaling & integrasjoner", "Stripe, Gelato API, Black Forest Labs FLUX.2, Brevo, Discord OAuth"),
            ("DevOps & testing", "GitHub Actions, Jest, Playwright, Storybook, CI/CD, Ytelsesoptimalisering"),
            ("Verktøy", "Claude Code, Git, Prisma, Bruno, Postman, Swagger/OpenAPI"),
        ],
        "other_experience": [
            {
                "company": "Hjemmesykepleien Bergen", "role": "Assistent",
                "period": "Okt 2022 – Mai 2025",
                "description": "Praktisk bistand til eldre og pleietrengende i hjemmet.",
            },
            {
                "company": "Coop Norge SA", "role": "Lagerfunksjonær",
                "period": "Aug 2019 – Des 2022",
                "description": "Fast 100% stilling ved sentrallager, deretter deltid ved Flesland parallelt med studier. Permisjon under førstegangstjenesten.",
            },
            {
                "company": "Jegerkompaniet, GSV", "role": "Grensejeger",
                "period": "Jan 2020 – Jan 2021",
                "description": "Verneplikt i Forsvaret som grensejeger ved Garnisonen i Sør-Varanger. Skarpe oppdrag på grensen til Russland. Patruljer under krevende arktiske forhold.",
            },
        ],
    },
}


def render_cv(lang, output_path):
    data = CONTENT[lang]
    sec = data["sections"]
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle(f"Sebastian Rosnes Sørensen — CV ({lang.upper()})")
    c.setAuthor("Sebastian Rosnes Sørensen")

    y = H - MT

    # ── Left accent strip ──
    c.setFillColor(ACCENT)
    c.rect(0, 0, 5 * mm, H, fill=1, stroke=0)

    # ── Header ──
    c.setFont("Helvetica-Bold", 20)
    c.setFillColor(BLACK)
    c.drawString(ML, y, "Sebastian Rosnes Sørensen")

    y -= 16
    c.setFont("Helvetica", 9.5)
    c.setFillColor(ACCENT)
    c.drawString(ML, y, data["tagline"])

    y -= 14
    c.setFont("Helvetica", 7.8)
    c.setFillColor(MUTED)
    c.drawString(ML, y, data["contact_line"])

    y -= 11
    c.setFont("Helvetica", 7.8)
    c.setFillColor(ACCENT)
    links = "sebastiansorensen.no  ·  github.com/SebastianRSorensen  ·  linkedin.com/in/sebastian-rosnes-sørensen-64bb5822a"
    c.drawString(ML, y, links)

    y -= 10
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.8)
    c.line(ML, y, W - MR, y)
    y -= 10

    # ── Professional Experience ──
    y = section_header(c, y, sec["experience"])

    for i, exp in enumerate(data["experience"]):
        y = entry_header(c, y, exp["company"], exp["role"], exp["period"], exp.get("location"))
        y = draw_para(c, y, exp["description"], STYLE_BODY)
        y -= 2
        for b in exp.get("bullets", []):
            y = bullet_point(c, y, b)
        if exp.get("link"):
            y = link_text(c, y, exp["link"])
        else:
            y -= 8
        if i < len(data["experience"]) - 1:
            y -= 8

    # ── Education ──
    y = section_header(c, y, sec["education"])

    for i, edu in enumerate(data["education"]):
        # Institution + period
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(BLACK)
        c.drawString(ML, y, edu["institution"])
        c.setFont("Helvetica", 7.5)
        c.setFillColor(MUTED)
        c.drawRightString(W - MR, y, edu["period"])
        y -= 11
        # Degree
        c.setFont("Helvetica-Oblique", 8)
        c.setFillColor(MUTED)
        c.drawString(ML, y, edu["degree"])
        y -= 5
        y = draw_para(c, y, edu["description"], STYLE_BODY)
        if i < len(data["education"]) - 1:
            y -= 10

    # ── Technical Skills ──
    y = section_header(c, y, sec["skills"])

    for label, value in data["skills"]:
        y = skill_row(c, y, label, value)
    y -= 2

    # ── Other Experience ──
    y = section_header(c, y, sec["other"])

    for i, exp in enumerate(data["other_experience"]):
        # Compact: company — role on left, period on right
        c.setFont("Helvetica-Bold", 8.5)
        c.setFillColor(BLACK)
        header = f"{exp['company']}"
        c.drawString(ML, y, header)

        c.setFont("Helvetica", 7.5)
        c.setFillColor(MUTED)
        c.drawRightString(W - MR, y, exp["period"])

        y -= 10
        c.setFont("Helvetica-Oblique", 7.8)
        c.setFillColor(MUTED)
        c.drawString(ML, y, exp["role"])

        y -= 6
        y = draw_para(c, y, exp["description"], STYLE_BODY)
        if i < len(data["other_experience"]) - 1:
            y -= 8

    c.save()
    print(f"  ✓ {output_path}")


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    public_dir = os.path.join(project_root, "public")

    print("Generating CVs...")
    render_cv("en", os.path.join(public_dir, "sebastian-sorensen-cv-en.pdf"))
    render_cv("no", os.path.join(public_dir, "sebastian-sorensen-cv-no.pdf"))
    print("Done.")


if __name__ == "__main__":
    main()