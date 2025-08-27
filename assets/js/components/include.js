// assets/js/components/include.js
// Usage: place <div data-include="/components/header.html"></div> in your HTML.
// Paths in nested folders: use relative paths like ../components/header.html
(async function(){
  const nodes = document.querySelectorAll('[data-include]');
  for (const el of nodes) {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      el.innerHTML = await res.text();
    } catch (e) {
      el.innerHTML = `<div class="notice">Failed to load ${NotesApp.escapeHTML(url)}</div>`;
    }
  }
})();
