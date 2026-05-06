# Launch Checklist

The day Versys publicly launches (target May 2026), or the day the first paying carrier signs up — whichever comes first — work through this list before flipping any switches.

## Switch the CTAs

- [ ] Hero "Coming May 2026" pill → "Now available"
- [ ] Hero waitlist form → "Sign up free" linking to TMS signup at `https://tms.versysinc.com/signup` (or wherever the live TMS lives)
- [ ] Final CTA waitlist form → same swap
- [ ] Drop the "We're opening to carriers in batches" line, replace with a launch-day welcome line

## Add the live TMS demo link

(Only after admin + billing in TMS are done — Phases 1d + 7.)

- [ ] Add a "See it live" button near the hero, linking to a guest demo company in the TMS
- [ ] Verify the demo company has clean fake data (no real PII)

## Add social proof

- [ ] Add testimonials section (with written permission from each carrier)
- [ ] Add carrier logos row (with written permission)

## Build the content moat (post-launch SEO)

- [ ] Write 3–5 launch blog posts:
  - "How much can a 5-truck fleet save on fuel in 2026?"
  - "Free TMS comparison: what's actually included"
  - "How to file IFTA in under 10 minutes with the Versys card"
- [ ] List Versys on Capterra, G2, Software Advice (need real reviews first)
- [ ] Verify Google Business profile

## Re-shoot screenshots

- [ ] Re-capture the 15 TMS screenshots if the UI has changed since spec
- [ ] Update OG share image with the launch-day headline

## Final verification before opening signups

- [ ] Run Lighthouse on the production URL — confirm 95+ Performance, 90+ A11y/BP/SEO
- [ ] Smoke-test waitlist → live signup transition (one round-trip with a real test email)
- [ ] Verify the email backend hasn't hit Resend's free-tier limits (3000/month) — if close, upgrade or rate-limit
- [ ] Verify domain (versysinc.com) is live with SSL, no mixed-content warnings
- [ ] Verify all schema.org JSON-LD validates via Google's Rich Results Test
