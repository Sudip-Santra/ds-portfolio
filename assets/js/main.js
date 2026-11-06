/* Delta System showcase — project filter + footer year (no dependencies) */
(function () {
  "use strict";

  /* ── Project filter (index page only) ────────────────── */
  var buttons = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".proj[data-tags]");
  var empty = document.querySelector(".empty");

  function apply(tag) {
    var shown = 0;
    items.forEach(function (el) {
      var match = tag === "all" || el.getAttribute("data-tags").split(" ").indexOf(tag) !== -1;
      el.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
    buttons.forEach(function (b) {
      var on = b.getAttribute("data-filter") === tag;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); });
  });

  if (items.length) apply("all");

  /* ── Footer year ─────────────────────────────────────── */
  document.querySelectorAll(".year").forEach(function (y) {
    y.textContent = new Date().getFullYear();
  });
})();
