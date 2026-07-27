/* Site behaviour: theme toggle, mobile nav, sticky header state, scroll reveal. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------------------------------------------------------------- theme */
  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* Follow the OS preference until the visitor picks a theme explicitly. */
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var onSchemeChange = function (e) {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (err) { /* ignore */ }
    if (!stored) root.setAttribute("data-theme", e.matches ? "dark" : "light");
  };
  if (media.addEventListener) media.addEventListener("change", onSchemeChange);
  else if (media.addListener) media.addListener(onSchemeChange);

  /* ------------------------------------------------------------ mobile nav */
  var burger = document.getElementById("nav-burger");
  var links = document.getElementById("nav-links");
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* -------------------------------------------------------- sticky header */
  var header = document.getElementById("site-header");
  if (header) {
    var syncHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  /* --------------------------------------------------------- scroll reveal */
  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

  targets.forEach(function (el) { observer.observe(el); });
})();
