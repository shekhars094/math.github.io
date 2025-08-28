(function () {
    function slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }

    function buildTOC() {
        var content = document.querySelector("main.content");
        var mount = document.getElementById("toc-list");
        console.log(content);
        if (!content || !mount) return;

        var headings = content.querySelectorAll("h2, h3");
        var ul = document.createElement("ul");
        var currentH2Li = null;
        var currentSubUl = null;

        headings.forEach(function (h) {
            if (!h.id) {
                h.id = slugify(h.textContent);
            }
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "#" + h.id;
            a.textContent = h.textContent;
            li.appendChild(a);

            if (h.tagName.toLowerCase() === "h2") {
                currentH2Li = li;
                currentSubUl = document.createElement("ul");
                currentH2Li.appendChild(currentSubUl);
                ul.appendChild(currentH2Li);
            } else {
                if (!currentSubUl) {
                    currentH2Li = document.createElement("li");
                    currentSubUl = document.createElement("ul");
                    currentH2Li.appendChild(currentSubUl);
                    ul.appendChild(currentH2Li);
                }
                currentSubUl.appendChild(li);
            }
        });

        mount.innerHTML = "";
        mount.appendChild(ul);
    }

    document.addEventListener("DOMContentLoaded", buildTOC);
})();
