# Ailece Koltuk Yıkama — Product Specification

## Product

Create a concise, single-page landing page for a professional upholstery-cleaning service operating in Istanbul's European side.

Working brand name: Ailece Koltuk Yıkama

Primary domain: `ailecekoltuktemizleme.com`

The website must be designed primarily for mobile visitors coming from Google Search and Google Ads. The website itself must be entirely in Turkish.

## Primary business goal

The main goal is to convert visitors into WhatsApp leads:

1. Open WhatsApp.
2. Send photos of the furniture that needs cleaning.
3. Ask for a price quote.

Primary WhatsApp number: `+90 537 342 01 61`

WhatsApp URL: `https://wa.me/905373420161`

Suggested prefilled message: `Merhaba, koltuklarımı yıkatmak istiyorum. Fotoğrafları gönderip fiyat alabilir miyim?`

Do not display fixed service prices on the website.

## Core positioning

The strongest competitive advantage is trust. The service team consists of a married couple who genuinely visit customers' homes together.

The emotional benefit is that the customer knows who is entering their home and feels more comfortable opening their door.

Do not build the brand around the literal phrase "karı-koca." Prefer concepts such as:

- Evinize ailece geliyoruz.
- Kapınızı kime açtığınızı bilin.
- Evinize gelen ekibi tanıyın.
- İçiniz rahat, koltuklarınız tertemiz.
- Ailece geliyor, profesyonelce temizliyoruz.

Write stronger Turkish copy when appropriate. Do not use fear-based marketing or imply competitors are dangerous, criminals, untrustworthy, or harmful. Position the service positively around familiarity, transparency, professionalism, and peace of mind.

## Brand personality and audience

Desired perception: approximately 80% professional and 20% warm family business. Aim for a professional, clean, calm, trustworthy, approachable, modern, and easy-to-understand page.

Primary audience: families in Istanbul's European side. Trust is especially important for people uncomfortable allowing unknown service workers into their homes. Do not narrowly position the service around one gender unless necessary.

## Verified business facts

Only use these facts:

- The team is genuinely a married couple and visits customers together.
- They have more than 15 years of experience.
- They have served tens of thousands of satisfied customers.
- A typical cleaning appointment takes approximately 3 hours.
- They use professional cleaning equipment.
- They care about arriving at the agreed appointment time.
- A quoted price is not increased later without a legitimate change in scope.

Do not invent more precise numbers, reviews, ratings, certifications, awards, guarantees, customer names, or service areas.

## Services and service area

Current service categories:

- sofa and upholstery cleaning
- chair cleaning
- mattress cleaning
- similar suitable textile surfaces

User-facing service names must be natural Turkish.

Primary market: İstanbul Avrupa Yakası.

Known priority areas:

- Bahçelievler
- Fatih

Additional districts may be added later. Do not invent service areas.

## Customer journey

1. Customer sends photos through WhatsApp.
2. The business provides a price quote.
3. An appointment is scheduled.
4. The team visits the home.
5. Cleaning is completed.
6. Payment is collected.

The page may simplify this into 3–5 visual steps if that improves comprehension.

## Information hierarchy

Within a few seconds, a visitor should understand:

1. What service is offered?
2. Where is it available?
3. Why is this team different?
4. Why should they trust the team?
5. How do they get a quote?

Keep the site concise. Avoid content that does not answer these questions or increase conversion confidence.

## Landing-page and CTA direction

Possible structure:

- compact header
- hero
- trust proof
- family-team differentiator
- services
- simple process
- real customer-review area only if authentic reviews become available
- service areas
- short FAQ
- final CTA
- mobile sticky WhatsApp CTA

The hero must immediately communicate upholstery or sofa cleaning, Istanbul European side, the family-team trust advantage, and the WhatsApp quote action. Do not position the service primarily around low prices.

Primary CTA intent: send furniture photos through WhatsApp and receive a quote. Good directions include "Fotoğraf Gönder, Fiyat Al", "WhatsApp'tan Fiyat Al", and "Koltuğunun Fotoğrafını Gönder". Avoid vague CTA text.

If real team photos are unavailable, do not use stock photography pretending to represent the team. Prefer a strong layout without photography and leave a clear TODO for authentic images.

## Visual direction

Design mobile-first for visitors roughly 35–60 years old. Prioritize readable typography, obvious CTA buttons, generous spacing, clear hierarchy, strong contrast, simple navigation, and easy scanning.

Avoid excessive gradients, glassmorphism, decorative animation, 3D effects, startup-style visuals, tiny typography, and overloaded cards. The page should feel like a modern, trustworthy local service brand.

## Technical stack

Use HTML5, CSS, and vanilla JavaScript. No frontend framework is required.

Preferred output:

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`

Keep JavaScript minimal. Do not require JavaScript to render critical business or SEO content.

## SEO

Support local, service-intent search without keyword stuffing. Relevant search concepts include koltuk yıkama, koltuk temizleme, profesyonel koltuk yıkama, ailece koltuk yıkama, İstanbul koltuk yıkama, İstanbul Avrupa Yakası koltuk yıkama, Bahçelievler koltuk yıkama, and Fatih koltuk yıkama.

Use these naturally, write for humans first, and do not position the brand as low-cost.

Implement appropriate technical SEO:

- descriptive title and meta description
- canonical: `https://ailecekoltuktemizleme.com/`
- Open Graph metadata
- crawlable HTML content
- useful heading hierarchy
- descriptive alt text
- `robots.txt`
- `sitemap.xml`
- appropriate structured data without invented properties

Do not create a fake storefront address. The business is service-area based.

## Analytics architecture

Prepare for Google Tag Manager as the primary tag-management layer, with future integrations for Google Analytics 4, Google Ads conversion tracking, and Meta Pixel. Do not invent tracking IDs; use clearly marked placeholders when needed.

The key event is `whatsapp_click`. All primary WhatsApp CTAs should produce a consistent signal, with contextual placement where practical, such as `hero`, `header`, `sticky_mobile`, and `final_cta`.

A WhatsApp click indicates conversion intent, not a completed sale. The architecture should permit higher-quality lead stages later.

## Performance

Prioritize fast loading. Avoid unnecessary third-party dependencies. Optimize image behavior when real images are added. Do not sacrifice conversion clarity for decorative effects.
