// assets/js/pages/home.js
(async function(){
  const res = await fetch('data/notes.json');
  const notes = await res.json();
  const latest = notes.slice(0, 6);
  const listEl = document.getElementById('latest-notes');
  if(!listEl) return;
  listEl.innerHTML = latest.map(n => `
    <article class="card note-card">
      <h3><a href="${n.url}">${NotesApp.escapeHTML(n.title)}</a></h3>
      <div class="meta">${NotesApp.fmtDate(n.date)} · ${n.tags.map(t=>`<span class="badge">${NotesApp.escapeHTML(t)}</span>`).join(' ')}</div>
      <p>${NotesApp.escapeHTML(n.summary || '')}</p>
    </article>
  `).join('');
})();
