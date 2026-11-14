# Ranojoy Ghosh — Video Editor Portfolio

A one-page portfolio in plain HTML, CSS and JavaScript. There is nothing to install or build: edit a file, upload it, and the site updates.

```
index.html     page content and SEO tags
styles.css     colours, fonts and layout
script.js      projects, WhatsApp number, stats, testimonials, form
assets/        photos, videos, posters and the font
```

## Replace photos and videos

Put the new file in `assets/` with the **same file name** as the one it replaces.

| File | What it is |
|---|---|
| `portrait.jpg` | Photo at the top of the page (black and white works best: it is tinted gold) |
| `gyanirman-milestone.jpg` | Image in the About section |
| `og-image.jpg` | Preview shown when the link is shared (1200 × 630) |
| `podcast-clip.mp4`, `color-grading.mp4`, `ai-editing.mp4` | Full videos, played with sound |
| `…-preview.mp4` | Short silent loops shown on the page |
| `…-poster.jpg` | Still image shown before a video loads |

Keep each full video under about 15 MB so it loads on mobile data. With ffmpeg:

```
ffmpeg -i input.mp4 -vf scale=720:-2 -c:v libx264 -crf 28 -movflags +faststart -c:a aac -b:a 96k assets/name.mp4
ffmpeg -t 8 -i input.mp4 -an -vf scale=432:-2 -c:v libx264 -crf 31 -movflags +faststart assets/name-preview.mp4
ffmpeg -ss 5 -i input.mp4 -frames:v 1 -vf scale=720:-2 assets/name-poster.jpg
```

## Add a new project

Open `script.js` and add one object to the `PROJECTS` list:

```js
{
  title: "Promo Video — Shop name",
  category: "Promo",
  description: "One line on what you did.",
  length: "0:30",
  video: "assets/shop-promo.mp4",
  preview: "assets/shop-promo-preview.mp4",   // optional
  poster: "assets/shop-promo-poster.jpg",
},
```

Filter buttons appear by themselves once there are more than three projects.

In the same file, fill in `STATS` and `TESTIMONIALS` with real numbers and real client quotes. Both stay hidden while they are empty.

## Change the WhatsApp number

In `script.js`, change the first setting (country code + number, digits only):

```js
const WHATSAPP = "919382290197";
```

Every WhatsApp button and the contact form use it. The number is also written as text in `index.html` (contact list and the `telephone` line near the top), so update it there too.

## Deploy for free

**GitHub Pages:** push these files to a GitHub repository, then open Settings → Pages, choose "Deploy from a branch", pick `main` and `/ (root)`, and save. The site appears at `https://USERNAME.github.io/REPO/` within a minute or two.

**Netlify:** drag this folder onto app.netlify.com/drop.

**Vercel:** import the repository at vercel.com. No build settings are needed.

If the site address ever changes, update the two `og:` links near the top of `index.html` so shared links keep showing the preview image.
