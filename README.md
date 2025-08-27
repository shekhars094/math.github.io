# Vanilla Notes Site (GitHub Pages ready)

A build-free, multi-page notes system using only **HTML + CSS + JS**.

## File structure

```
.
├─ index.html
├─ about.html
├─ search.html
├─ toc.html
├─ 404.html
├─ notes/
│  ├─ index.html
│  └─ 2025/
│     └─ hello-world.html
├─ tags/
│  └─ index.html
├─ components/
│  ├─ header.html
│  └─ footer.html
├─ data/
│  └─ notes.json
├─ assets/
│  ├─ css/ (base.css, layout.css, theme.css, components.css, typography.css)
│  └─ js/
│     ├─ utils/ (dom.js, time.js)
│     ├─ components/ (include.js, theme-toggle.js)
│     └─ pages/ (home.js, notes-list.js, tags.js, search.js, toc.js, note-nav.js)
└─ templates/
   ├─ note.template.html
   └─ note.meta.example.json
```

## How it works
- **Header/Footer includes**: Pages load `components/header.html` and `components/footer.html` at runtime.
- **Notes data**: `data/notes.json` drives listings, tags, ToC, search, and prev/next links.
- **Dark mode**: Toggle in the header (saved to `localStorage`).

## Add a new note
1. Copy `templates/note.template.html` to `notes/YYYY/your-note.html` (create the year folder if needed).
2. Replace `{{TITLE}}`, `{{DATE_ISO}}`, `{{DATE_HUMAN}}`, `{{TAGS_HTML}}` (e.g. `<span class="badge">tag1</span> <span class="badge">tag2</span>`).
3. Edit `data/notes.json` and append a new object for the note. Use `templates/note.meta.example.json` as a guide.
4. (Optional) Set `category` to group the note in **ToC**.
5. Commit + push to GitHub.

> Tip: Keep `notes.json` sorted by date DESC so newest notes appear first. The sample already follows this.

## Deploy on GitHub Pages
- For a **user site** (`username.github.io`), you’re done — paths work as-is.
- For a **project site** (`username.github.io/repo`), keep the structure as-is. All asset paths are relative in each HTML file, so no special base path config is needed.

## Local preview
Just open `index.html` in a browser, or serve with a simple server:
```sh
python3 -m http.server 8080
```

## Common tweaks
- **Custom domain**: add a `CNAME` file at repo root with your domain.
- **Favicons**: add icons and a `<link rel="icon" ...>` in `<head>`.
- **Analytics**: paste your script into `components/footer.html` before the closing tag.
