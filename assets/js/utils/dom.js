// assets/js/utils/dom.js
window.NotesApp = window.NotesApp || {};
NotesApp.$ = (sel, root=document) => root.querySelector(sel);
NotesApp.$$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
NotesApp.escapeHTML = (s) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]));
NotesApp.qsParam = (key) => new URLSearchParams(location.search).get(key);
NotesApp.fmtDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {year:'numeric', month:'short', day:'numeric'});
};
