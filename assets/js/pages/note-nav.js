// assets/js/pages/note-nav.js
(async function(){
  // Show prev/next note links based on chronological order
  const res = await fetch('../../data/notes.json');
  const notes = await res.json();
  const here = location.pathname.replace(/.+\//, ''); // file name
  const idx = notes.findIndex(n => n.url.endsWith(here));
  if(idx === -1) return;
  const prev = notes[idx+1];
  const next = notes[idx-1];
  const nav = document.getElementById('note-nav');
  if(!nav) return;
  nav.innerHTML = `
    <div class="flex" style="justify-content:space-between">
      <div>${prev ? `← <a href="${prev.url}">${NotesApp.escapeHTML(prev.title)}</a>` : ''}</div>
      <div>${next ? `<a href="${next.url}">${NotesApp.escapeHTML(next.title)}</a> →` : ''}</div>
    </div>
  `;
})();
