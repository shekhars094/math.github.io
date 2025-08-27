// assets/js/pages/toc.js
(async function(){
  const res = await fetch('data/notes.json');
  const notes = await res.json();
  const groups = {};
  for(const n of notes){
    const cat = n.category || 'General';
    groups[cat] = groups[cat] || [];
    groups[cat].push(n);
  }
  const out = NotesApp.$('#toc');
  out.innerHTML = Object.entries(groups).map(([cat, items]) => {
    items.sort((a,b)=> a.title.localeCompare(b.title));
    const lis = items.map(n => `<li><a href="${n.url}">${NotesApp.escapeHTML(n.title)}</a> <span class="note-meta">· ${n.tags.map(t=>`<span class="badge">${NotesApp.escapeHTML(t)}</span>`).join(' ')}</span></li>`).join('');
    return `<section class="card"><h3>${NotesApp.escapeHTML(cat)}</h3><ul>${lis}</ul></section>`;
  }).join('');
})();
