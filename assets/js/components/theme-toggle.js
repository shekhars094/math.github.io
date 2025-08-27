// assets/js/components/theme-toggle.js
(function(){
  const key='notes-theme';
  function apply(theme){
    if(theme==='light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
  }
  const saved = localStorage.getItem(key) || 'dark';
  apply(saved);
  document.addEventListener('click', (e)=>{
    if(e.target && e.target.id==='theme-toggle'){
      const cur = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      const next = cur==='light' ? 'dark' : 'light';
      localStorage.setItem(key, next);
      apply(next);
    }
  });
})();
