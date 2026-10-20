# Kitebuild Studio website

Static one-page site (HTML/CSS/JS, no build step). Open `index.html` locally to preview.

## Contact
- WhatsApp: +971 50 776 1066 (wa.me/971507761066); the contact form opens WhatsApp with the fields prefilled, with a mailto fallback.
- Email: kitebuildstudio@mail.grokbot.com
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
