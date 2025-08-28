(function () {
    const body = document.body;

    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `
    window.MathJax = {
      tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']] }
    };
  `;
    body.appendChild(configScript);

    const scriptTag = document.createElement("script");
    scriptTag.src =
        "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    scriptTag.defer = true;
    body.appendChild(scriptTag);
})();
