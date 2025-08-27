// assets/js/pages/search.js
(async function(){
  const res = await fetch('data/notes.json');
  const notes = await res.json();
  const q = NotesApp.qsParam('q') || '';
  const input = NotesApp.$('#q');
  const out = NotesApp.$('#results');
  input.value = q;

  function score(note, query){
    const hay = (note.title + ' ' + (note.summary||'') + ' ' + note.tags.join(' ')).toLowerCase();
    let s = 0;
    query.toLowerCase().split(/\s+/).forEach(w => {
      if(!w) return;
      if(hay.includes(w)) s += 1;
      if(note.title.toLowerCase().includes(w)) s += 1; // weight title
    });
    return s;
  }

  function doSearch(text){
    const qs = text.trim();
    if(!qs){ out.innerHTML=''; return; }
    const ranked = notes
      .map(n => ({n, s: score(n, qs)}))
      .filter(x => x.s > 0)
      .sort((a,b)=> b.s - a.s || new Date(b.n.date) - new Date(a.n.date))
      .slice(0, 50);
    out.innerHTML = ranked.map(({n})=>{
      const snippet = (n.summary || '').replace(new RegExp(`(${qs})`, 'ig'), '<mark>$1</mark>');
      return `<article class="card search-hit">
          <h3><a href="${n.url}">${NotesApp.escapeHTML(n.title)}</a></h3>
          <div class="meta">${NotesApp.fmtDate(n.date)} · ${n.tags.map(t=>`<span class="badge">${NotesApp.escapeHTML(t)}</span>`).join(' ')}</div>
          <p>${snippet}</p>
        </article>`;
    }).join('') || '<div class="notice">No results.</div>';
  }

  doSearch(q);
  input.addEventListener('input', e => doSearch(e.target.value));
})();
