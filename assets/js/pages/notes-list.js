// assets/js/pages/notes-list.js
(async function(){
  const res = await fetch('../data/notes.json');
  const notes = await res.json();
  const yearSel = NotesApp.$('#filter-year');
  const tagSel = NotesApp.$('#filter-tag');
  const listEl = NotesApp.$('#all-notes');
  const years = [...new Set(notes.map(n=> new Date(n.date).getFullYear()))].sort((a,b)=>b-a);
  const tags = [...new Set(notes.flatMap(n=> n.tags))].sort((a,b)=> a.localeCompare(b));
  yearSel.innerHTML = '<option value="">All years</option>' + years.map(y=>`<option>${y}</option>`).join('');
  tagSel.innerHTML = '<option value="">All tags</option>' + tags.map(t=>`<option>${NotesApp.escapeHTML(t)}</option>`).join('');

  function render(){
    const y = yearSel.value;
    const t = tagSel.value;
    const filtered = notes.filter(n => (!y || new Date(n.date).getFullYear()==y) && (!t || n.tags.includes(t)));
    listEl.innerHTML = filtered.map(n => `
      <article class="card note-card">
        <h3><a href="${n.url}">${NotesApp.escapeHTML(n.title)}</a></h3>
        <div class="meta">${NotesApp.fmtDate(n.date)} · ${n.tags.map(t=>`<span class="badge">${NotesApp.escapeHTML(t)}</span>`).join(' ')}</div>
        <p>${NotesApp.escapeHTML(n.summary || '')}</p>
      </article>
    `).join('');
    NotesApp.$('#count').textContent = filtered.length;
  }
  yearSel.addEventListener('change', render);
  tagSel.addEventListener('change', render);
  render();
})();
