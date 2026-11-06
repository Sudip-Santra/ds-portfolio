/* Delta System — landing page interactions (no dependencies) */
(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  /* ── Mobile menu ─────────────────────────────────────── */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  document.querySelectorAll(".mobile-menu a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) setMenu(false);
  });

  /* ── Active nav link (scroll spy) ────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Client marquee: duplicate track for a seamless loop ─ */
  var track = document.querySelector(".marquee-track");
  if (track) {
    Array.prototype.slice.call(track.children).forEach(function (node) {
      var clone = node.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.alt = "";
      track.appendChild(clone);
    });
  }

  /* ── Contact form → opens the visitor's email client ─── */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var TO = "hello@deltasystem.in";

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = form.elements.name;
    var email = form.elements.email;
    var message = form.elements.message;
    var ok = true;

    [name, email, message].forEach(function (f) {
      var valid = f.value.trim() !== "" && (f.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
      f.classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });

    if (!ok) {
      note.textContent = "Please fill in your name, a valid email and a few project details.";
      return;
    }

    var needs = Array.prototype.slice.call(form.querySelectorAll('input[name="need"]:checked'))
      .map(function (c) { return c.value; });

    var subject = "New project enquiry — " + name.value.trim();
    var body =
      "Name: " + name.value.trim() + "\n" +
      "Email: " + email.value.trim() + "\n" +
      (needs.length ? "Interested in: " + needs.join(", ") + "\n" : "") +
      "\n" + message.value.trim();

    window.location.href = "mailto:" + TO +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    note.textContent = "Opening your email app… If nothing happens, write to " + TO + ".";
  });

  form.querySelectorAll("input, textarea").forEach(function (f) {
    f.addEventListener("input", function () { f.classList.remove("is-invalid"); });
  });

  /* ── Footer year ─────────────────────────────────────── */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
