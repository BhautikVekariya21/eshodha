/* ============================================================
   eSHODHA INDUSTRIES — main.js
   Nav, reveal, counters, tabs, process flow, accordion,
   slider, filters, forms (all scenarios)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Sticky header ---------- */
  var header = document.querySelector(".header");
  var backTop = document.querySelector(".back-top");
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (backTop) backTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (backTop) backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".hamburger");
  var menu = document.querySelector(".menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("open");
      menu.classList.toggle("open");
      document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.classList.remove("open");
        menu.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count") || "0");
    var decimals = (el.getAttribute("data-decimals") || "0");
    var dur = 1600, t0 = null;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Animated bar charts ---------- */
  var bars = document.querySelectorAll(".bar-fill");
  if (bars.length && "IntersectionObserver" in window) {
    var bo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = (e.target.getAttribute("data-val") || "0") + "%";
          bo.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (b) { bo.observe(b); });
  }

  /* ---------- Generic tabs (products etc.) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var tabs = group.querySelectorAll("[data-tab]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var scope = document.getElementById(group.getAttribute("data-tabs"));
        tabs.forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        if (scope) {
          scope.querySelectorAll(".prod-panel").forEach(function (p) {
            p.classList.toggle("active", p.id === tab.getAttribute("data-tab"));
          });
        }
      });
    });
  });

  /* ---------- Accordion ---------- */
  document.querySelectorAll(".accordion").forEach(function (acc) {
    acc.querySelectorAll(".acc-head").forEach(function (head) {
      head.addEventListener("click", function () {
        var item = head.parentElement;
        var body = item.querySelector(".acc-body");
        var isOpen = item.classList.contains("open");
        acc.querySelectorAll(".acc-item").forEach(function (it) {
          it.classList.remove("open");
          var b = it.querySelector(".acc-body");
          if (b) b.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });
  });

  /* ---------- Testimonial slider ---------- */
  document.querySelectorAll("[data-slider]").forEach(function (slider) {
    var row = slider.querySelector(".tst-row");
    var dotsWrap = slider.querySelector(".tst-ctrl");
    var slides = row ? row.children.length : 0;
    if (!row || !slides) return;
    var idx = 0, timer = null;
    function go(i) {
      idx = (i + slides) % slides;
      row.style.transform = "translateX(-" + idx * 100 + "%)";
      if (dotsWrap) {
        dotsWrap.querySelectorAll(".tst-dot").forEach(function (d, di) {
          d.classList.toggle("active", di === idx);
        });
      }
    }
    if (dotsWrap) {
      for (var i = 0; i < slides; i++) {
        (function (i) {
          var d = document.createElement("button");
          d.className = "tst-dot" + (i === 0 ? " active" : "");
          d.setAttribute("aria-label", "Slide " + (i + 1));
          d.addEventListener("click", function () { go(i); restart(); });
          dotsWrap.appendChild(d);
        })(i);
      }
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 6000);
    }
    restart();
  });

  /* ---------- Form handler (all demo forms) ---------- */
  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.style.borderColor = bad ? "var(--bad)" : "";
        if (bad) ok = false;
      });
      var success = form.querySelector(".form-success") ||
                    form.parentElement.querySelector(".form-success");
      if (!ok) { if (success) success.classList.remove("show"); return; }
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
    });
  });

  /* ---------- Job filter (careers) ---------- */
  var filterBar = document.querySelector(".filter-bar");
  if (filterBar) {
    var jobs = document.querySelectorAll("[data-job-cat]");
    filterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-filter");
        jobs.forEach(function (j) {
          j.style.display = (cat === "all" || j.getAttribute("data-job-cat") === cat) ? "" : "none";
        });
      });
    });
  }

  /* ---------- Process flow (operations page) ---------- */
  var flowRoot = document.getElementById("flowRoot");
  if (flowRoot) {
    var stepBtns = flowRoot.querySelectorAll(".flow-step");
    var stages = flowRoot.querySelectorAll(".flow-stage");
    var bar = document.getElementById("flowBar");
    var current = 0, auto = null;

    function show(i, user) {
      current = (i + stepBtns.length) % stepBtns.length;
      stepBtns.forEach(function (b, bi) {
        b.classList.toggle("active", bi === current);
        b.classList.toggle("done", bi < current);
      });
      stages.forEach(function (s, si) {
        s.style.display = si === current ? "block" : "none";
        if (si === current) {
          s.style.animation = "none";
          void s.offsetWidth;
          s.style.animation = "fadeUp .45s ease";
        }
      });
      if (bar) bar.style.width = ((current + 1) / stepBtns.length * 100) + "%";
      if (user) restartAuto();
    }
    function restartAuto() {
      clearInterval(auto);
      auto = setInterval(function () { show(current + 1); }, 7000);
    }
    stepBtns.forEach(function (b, bi) {
      b.addEventListener("click", function () { show(bi, true); });
    });
    var prev = document.getElementById("flowPrev");
    var next = document.getElementById("flowNext");
    if (prev) prev.addEventListener("click", function () { show(current - 1, true); });
    if (next) next.addEventListener("click", function () { show(current + 1, true); });
    show(0);
    restartAuto();
  }
})();
