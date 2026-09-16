THE ARCADE RENTAL — WEBSITE PACKAGE v6
========================================
WHAT ACTUALLY CHANGED IN v6 — FIXED THE ROOT CAUSE, NOT JUST THE SYMPTOM

You were right that the index page (and its screenshots) looked broken and
nothing like your original file. I dug in and found two real, fixable causes
— not just a rendering-tool quirk:

1. FONTS — the site was loading "Press Start 2P" and "Rubik" from Google
   Fonts over the network. Self-hosted the actual font files instead
   (fonts/press-start-2p.woff2, fonts/rubik-400/500/700.woff2, all in this
   folder), and every page now references them with a local @font-face rule.
   This means the real pixel-style font now renders correctly and reliably —
   including offline, on any host, with zero dependency on Google's CDN.

2. PHOTOS — the site was hotlinking stock photos from Unsplash. Replaced
   every one of those with a small, self-contained placeholder graphic
   (an inline SVG — a branded striped background with "YOUR PHOTO HERE" +
   a caption) that needs no network fetch at all. These will always render,
   look intentional rather than broken, and are trivial to swap for Steve's
   real photos later — just replace the <img src="..."> value on any page.

3. Also re-confirmed the earlier .cols/.split CSS fix is intact (homepage's
   "Two Ways to Play" cards use the original 1fr/1fr rule; booking/contact/
   audience pages use the separate .split rule) — verified via direct diff
   against your original uploaded file, not just visually.

Net effect: the site no longer depends on ANY external network resource to
render correctly — no Google Fonts, no Unsplash. Open any page directly in
a browser, even offline, and it will look the way it's designed to look.

STILL NEEDS BEFORE GOING LIVE
1. Real photos — swap the SVG placeholders for Steve's actual trailer, claw
   machine, and event photos whenever he has them (see AUDIENCE_PHOTOS in
   data.py for the audience pages, and the hero/strip images in the home
   page section of build_site.py).
2. EmailJS credentials — contact.html, booking.html, and careers.html forms
   need a real service ID / template ID / public key to actually send.
3. A real PayPal/Stripe/Square button wired into booking.html to take payment.
4. Confirmation of the suggested event/monthly pricing before publishing.

EVERYTHING ELSE IS UNCHANGED FROM v5
- index.html — photo hero, "See the Setup" strip, "Two Ways to Play" cards
- 17 audience pages, each with a hero placeholder graphic
- booking.html — interactive checkout with live order summary + deposit calc
- careers.html — job openings + application form
- faq.html, contact.html, rates.html, games.html, who-we-serve.html
- flyers/ (17 print-ready PDFs), facebook-posts.md

CONTACT INFO USED THROUGHOUT
Steve Hanford · TheArcadeRental@gmail.com · call/text 574-527-5765
