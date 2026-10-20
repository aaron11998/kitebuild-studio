# Kitebuild Studio website

Static one-page site (HTML/CSS/JS, no build step). Open `index.html` locally to preview.

## Before launch (TBDs)
- `CONTACT_EMAIL_TBD`: the mailto link in `index.html`
- WhatsApp number: `[add number]` in the Contact section
- `FORM_ID_TBD`: Formspree form ID in the form `action` (create a free form at formspree.io)
- Fiverr / Contra profile URLs: the `href="#"` links with `data-tbd`
- `SITE_URL_TBD`: canonical / og:url / og:image in `<head>`
- Music/video section: `<!-- MEDIA SLOT -->` placeholder after Work samples

## Free hosting: GitHub Pages
1. Create a public repo and push the contents of this folder to `main`.
2. Repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`. Custom domain: add it under Pages and create a CNAME DNS record.

## Free hosting: Firebase Hosting (Spark plan)
1. `npm i -g firebase-tools && firebase login`
2. In this folder: `firebase init hosting`. Choose a project, set the public dir to `.`, answer No to SPA rewrite.
3. `firebase deploy --only hosting` gives you `https://<project>.web.app`.

Images in `assets/img/` are cropped WebP copies of studio demo work.
