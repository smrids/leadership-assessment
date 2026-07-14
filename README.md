# GDPLI Leadership Self-Assessments — new pages

This folder adds four new assessments plus a hub landing page to your existing
`leadership-assessment` site, all in the same visual style as your Blake–Mouton page.

## Files

| File | What it is |
|------|------------|
| `index.html` | New **hub landing page** linking all five assessments |
| `leadership-animal.html` | Leadership Animal Style (DISC → Lion / Otter / Golden Retriever / Beaver) |
| `tki.html` | Thomas–Kilmann Conflict Mode (30 A/B pairs → 5 modes) |
| `emotional-intelligence.html` | Emotional Intelligence (50 statements → 5 competencies) |
| `power-profile.html` | Power Perception Profile (21 pairs → 7 power bases) |
| `google-apps-script.gs` | Server code that logs responses to Google Sheets |

Each assessment page: shows results instantly, has a **Download my results** (CSV)
button and a **Save / Print** button, collects an optional name + email, and logs
to Google Sheets once you configure the endpoint.

## Publishing to your GitHub Pages site

Your live site currently serves your Blake–Mouton assessment at
`index.html` (the repo root). To make the **hub** the new home page, do one small rename:

1. In your `smrids/leadership-assessment` repo, **rename the current `index.html`
   to `leadership-style.html`** (this keeps your existing assessment exactly as-is —
   the hub links to it under that name).
2. Upload the six files from this folder into the repo root, letting the new
   `index.html` (the hub) take the home-page slot.
3. Commit. GitHub Pages will update in a minute or two.

Result:
- `…/leadership-assessment/` → hub
- `…/leadership-assessment/leadership-style.html` → your original assessment
- plus the four new pages.

> Prefer to keep your current home page as-is? Then instead upload the hub as
> `hub.html`, skip the rename, and change the first hub card's link from
> `leadership-style.html` to `index.html`.

## Turning on Google Sheets logging

The new pages work immediately without this — results still show and download.
To also log responses:

1. Open the Google Sheet you want to use (the same one as your existing page is fine).
2. **Extensions ▸ Apps Script**, add a new script file, paste in
   `google-apps-script.gs`, and save.
3. **Deploy ▸ New deployment ▸ Web app**, set *Execute as: Me* and
   *Who has access: Anyone*, deploy, authorise, and copy the `/exec` URL.
4. In each of the four new HTML files, find the line near the top of the script:
   ```js
   const ENDPOINT = "";
   ```
   and paste your URL between the quotes. Save and re-upload.

Each assessment writes to its own tab in the sheet, created automatically with
headers on the first submission (Timestamp, Name, Email, then the scores and a
JSON copy of the raw answers).

## Notes on the logo

These pages use a lightweight SVG wordmark placeholder for the GDPLI logo. If you
want the exact raster logo from your existing page, drop the image file into the
repo as `gdpli-logo.png` and replace the `<!-- LOGO SLOT -->` block in each file's
header with `<img src="gdpli-logo.png" class="org-logo" alt="GDPLI">`.

## Attributions

- Leadership Animal Style — DISC behavioural styles model
- Conflict Mode — Thomas–Kilmann Conflict Mode Instrument (TKI)
- Emotional Intelligence — based on Daniel Goleman's model
- Power Perception Profile — adapted from Hersey & Natemeyer, Center for Leadership Studies
