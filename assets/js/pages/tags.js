// assets/js/pages/tags.js
(async function(){
  const res = await fetch('../data/notes.json');
  const notes = await res.json();
  const cloud = NotesApp.$('#tag-cloud');
  const listEl = NotesApp.$('#tag-notes');
  const params = new URLSearchParams(location.search);
  const current = params.get('tag');
  const tagCounts = notes.flatMap(n=> n.tags).reduce((acc,t)=> (acc[t]=(acc[t]||0)+1, acc), {});
  const tags = Object.entries(tagCounts).sort((a,b)=> b[1]-a[1]);

  cloud.innerHTML = tags.map(([t,c])=>{
    const active = t === current ? 'style="background:var(--accent); color:#fff"' : '';
    return `<a href="?tag=${encodeURIComponent(t)}" ${active}>${NotesApp.escapeHTML(t)} (${c})</a>`;
  }).join('');

  function render(tag){
    const filtered = tag ? notes.filter(n=> n.tags.includes(tag)) : notes;
    listEl.innerHTML = filtered.map(n => `
      <article class="card note-card">
        <h3><a href="${n.url}">${NotesApp.escapeHTML(n.title)}</a></h3>
        <div class="meta">${NotesApp.fmtDate(n.date)} · ${n.tags.map(t=>`<span class="badge">${NotesApp.escapeHTML(t)}</span>`).join(' ')}</div>
        <p>${NotesApp.escapeHTML(n.summary || '')}</p>
      </article>
    `).join('');
    NotesApp.$('#tag-title').textContent = tag ? `#${tag}` : 'All tags';
  }
  render(current);
})();
