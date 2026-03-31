/* ═══════════════════════════════════════════════════════════════════
   Ragikrishna Radhakrishnan — Portfolio  ·  script.js
   Final Rebuild 2025 — Vanilla JS, zero build step required
   ═══════════════════════════════════════════════════════════════════ */
"use strict";

/* ─────────────────────────────────────────────────────────────────
   ALL DATA
   ─────────────────────────────────────────────────────────────────*/

const SKILLS = [
  {
    icon: "terminal",
    name: "Python",
    sub:  "Data pipelines, automation, scripting",
  },
  {
    icon: "database",
    name: "SQL",
    sub:  "PostgreSQL, MySQL, complex queries & optimisation",
  },
  {
    icon: "bar-chart-2",
    name: "Power BI",
    sub:  "Advanced DAX, Power Query, interactive dashboards",
  },
  {
    icon: "cpu",
    name: "Scikit-learn",
    sub:  "Random Forest, Gradient Boosting, SMOTE, cross-validation",
  },
  {
    icon: "table-2",
    name: "Pandas",
    sub:  "EDA, data wrangling, aggregation pipelines",
  },
  {
    icon: "activity",
    name: "Matplotlib / Seaborn",
    sub:  "Statistical visualisations, HR charts, trend plots",
  },
  {
    icon: "file-spreadsheet",
    name: "Advanced Excel",
    sub:  "PivotTables, VBA macros, Power Query, dashboards",
  },
  {
    icon: "layers",
    name: "ML Pipelines",
    sub:  "SMOTE, Joblib serialisation, model deployment",
  },
];

const PROJECTS = [
  {
    emoji:   "🧬",
    stripe:  "blue",
    type:    "Machine Learning",
    title:   "Diabetes Prediction ML",
    bullets: [
      "<strong>90% Accuracy</strong> & 0.90+ ROC-AUC on held-out test data.",
      "Resolved class imbalance with <strong>SMOTE</strong> oversampling.",
      "Trained <strong>Random Forest</strong> and Gradient Boosting ensembles.",
      "Serialised the final pipeline via <strong>Joblib</strong> for production.",
    ],
    badges:  ["Python", "Scikit-learn", "SMOTE", "Joblib", "Pandas", "NumPy"],
    github:  "https://github.com/ragi-krish/Diabetes-indicator-prediction-Machine-Learning-Model",
  },
  {
    emoji:   "📊",
    stripe:  "emerald",
    type:    "Python · EDA",
    title:   "Employee Attrition Analytics",
    bullets: [
      "Identified key <strong>retention factors</strong> through deep-dive Python EDA.",
      "Visualised salary distributions using <strong>Seaborn & Matplotlib</strong>.",
      "Surfaced actionable HR insights to reduce voluntary churn.",
    ],
    badges:  ["Python", "Pandas", "Seaborn", "Matplotlib", "EDA"],
    github:  "https://github.com/ragi-krish/Exploratory-Data-Analysis--Employee-data",
  },
  {
    emoji:   "🌍",
    stripe:  "violet",
    type:    "Power BI · Dashboard",
    title:   "Global COVID-19 Analytics",
    bullets: [
      "Built a high-impact Power BI dashboard with <strong>Advanced DAX</strong>.",
      "Automated ETL via <strong>Power Query</strong> across 180+ countries.",
      "Dynamic <strong>time-series tracking</strong> for mortality & recovery KPIs.",
    ],
    badges:  ["Power BI", "DAX", "Power Query", "ETL", "Data Modelling"],
    github:  "https://github.com/ragi-krish/Corona-Virus-Analysis",
  },
];

const CERTIFICATIONS = [
  {
    icon:       "award",
    issuedBy:   "Entri Elevate",
    name:       "Data Science and Machine Learning Training",
    desc:       "Comprehensive programme covering statistics, Python, Scikit-learn, model evaluation, and production deployment. Includes a verified Illinois-programme badge.",
    illioisBadge: true,    /* triggers the special badge UI */
    featured:   true,
    link:       "#",
  },
  {
    icon:       "shield-check",
    issuedBy:   "Coursera",
    name:       "Python for Everybody Specialisation",
    desc:       "University of Michigan programme covering Python fundamentals, data structures, web scraping, and databases.",
    illioisBadge: false,
    featured:   false,
    link:       "#",
  },
];

const EXPERIENCE = [
  {
    period: "Nov 2022 – Present",
    role:   "Python Instructor",
    org:    "Edoxi Training Institute, Dubai",
    desc:   "I deliver comprehensive Python and Computer Science curricula focused on project-based learning and EmSAT examination preparation. By guiding students through fundamental coding logic, I help them transition from theoretical concepts to building functional, data-driven applications.",
  },
  {
    period: "2019 – 2020",
    role:   "Apprentice — Computer Engineering",
    org:    "Sree Chitra Tirunal Institute for Medical Sciences & Technology, Thiruvananthapuram",
    desc:   "Technical infrastructure support and system operations within a leading biomedical research environment. Gained hands-on exposure to applied computing and engineering processes.",
  },
];

const EDUCATION = [
  {
    period: "2016 – 2019",
    role:   "BTech — Computer Engineering",
    org:    "APJ Abdul Kalam Technologica University, Kerala, India",
    desc:   "Bachelor of Technology with focus on algorithms, databases, networks, and software engineering. Final-year project in network security analysis.",
  },
  {
    period: "2013 – 2016",
    role:   "Diploma in Computer Engineering",
    org:    "Technical University, Kerala, India",
    desc:   "Rigorous technical foundation in hardware architecture, networking, and system-level troubleshooting. Bridged the gap between physical computing infrastructure and software integration through hands-on engineering principles.",
  },
];


/* ─────────────────────────────────────────────────────────────────
   LUCIDE ICON FALLBACKS
   ─────────────────────────────────────────────────────────────────*/
function normalizeLucideIconName(name) {
  if (!name) { return name; }
  if (name === "github") {
    return "git-branch";   /* github is not included in latest lucide version */
  }
  if (name === "linkedin") {
    return "link";         /* use link as a safe social icon fallback */
  }
  return name;
}

function applyLucideIconFallbacks(root) {
  var scope = root || document;
  scope.querySelectorAll("[data-lucide]").forEach(function (el) {
    var raw = el.getAttribute("data-lucide");
    var normalized = normalizeLucideIconName(raw);
    if (normalized !== raw) {
      el.setAttribute("data-lucide", normalized);
    }
  });
}


/* ─────────────────────────────────────────────────────────────────
   INITIALISE — single DOMContentLoaded entry point
   ─────────────────────────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", function () {

  /* Ensure unsupported old social names are mapped before rendering icons */
  applyLucideIconFallbacks();

  /* Render all static <i data-lucide="..."> elements in the HTML */
  if (window.lucide) { lucide.createIcons(); }

  initTheme();
  initNavbar();
  initScrollReveal();
  buildSkills();
  buildProjects();
  buildCertifications();
  buildTimeline("expTimeline",  EXPERIENCE);
  buildTimeline("eduTimeline",  EDUCATION);
  initContactForm();
  initBackToTop();

});


/* ─────────────────────────────────────────────────────────────────
   1. THEME TOGGLE
      Persists to localStorage. Respects prefers-color-scheme.
   ─────────────────────────────────────────────────────────────────*/
function initTheme() {
  var btn  = document.getElementById("themeToggle");
  var body = document.body;

  /* Apply saved or system preference on load */
  var saved  = localStorage.getItem("rk-portfolio-theme");
  var sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && sysDark)) {
    body.classList.add("dark-mode");
  }

  if (!btn) return;
  btn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    localStorage.setItem(
      "rk-portfolio-theme",
      body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });
}


/* ─────────────────────────────────────────────────────────────────
   2. NAVBAR
      Glass blur on scroll + mobile hamburger drawer
   ─────────────────────────────────────────────────────────────────*/
function initNavbar() {
  var nav    = document.getElementById("siteNav");
  var burger = document.getElementById("burgerToggle");
  var drawer = document.getElementById("mobileMenu");
  if (!nav || !burger || !drawer) return;

  /* Scroll: toggle glass class */
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 44);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hamburger: open / close drawer */
  var isOpen = false;

  function setDrawer(open) {
    isOpen = open;
    drawer.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
  }

  burger.addEventListener("click", function () { setDrawer(!isOpen); });

  /* Close drawer when a link is clicked */
  drawer.querySelectorAll(".mob-link").forEach(function (a) {
    a.addEventListener("click", function () { setDrawer(false); });
  });

  /* Close on outside click */
  document.addEventListener("click", function (e) {
    if (isOpen && !nav.contains(e.target)) { setDrawer(false); }
  });
}


/* ─────────────────────────────────────────────────────────────────
   3. SCROLL REVEAL
      IntersectionObserver adds .is-visible to every .reveal element.
      data-rd attribute sets a per-element stagger delay (ms).
   ─────────────────────────────────────────────────────────────────*/
function initScrollReveal() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el    = entry.target;
      var delay = parseInt(el.getAttribute("data-rd") || "0", 10);
      setTimeout(function () { el.classList.add("is-visible"); }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.10 });

  document.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });
}

/* Helper: observe newly inserted .reveal nodes */
function observeNewReveals(root) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el    = entry.target;
      var delay = parseInt(el.getAttribute("data-rd") || "0", 10);
      setTimeout(function () { el.classList.add("is-visible"); }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.10 });

  root.querySelectorAll(".reveal").forEach(function (el) {
    io.observe(el);
  });
}

/* Re-run createIcons on a subtree after dynamic DOM insertion */
function refreshIcons() {
  applyLucideIconFallbacks();
  if (window.lucide) { lucide.createIcons(); }
}


/* ─────────────────────────────────────────────────────────────────
   4. BUILD SKILLS GRID
   ─────────────────────────────────────────────────────────────────*/
function buildSkills() {
  var grid = document.getElementById("skillsGrid");
  if (!grid) return;

  SKILLS.forEach(function (skill, i) {
    var card = document.createElement("div");
    card.className = "skill-card reveal";
    card.setAttribute("role", "listitem");
    card.setAttribute("data-rd", String(i * 55));

    card.innerHTML =
      '<div class="skill-icon-box">' +
        '<i data-lucide="' + skill.icon + '" width="20" height="20"></i>' +
      '</div>' +
      '<p class="skill-name">' + skill.name + '</p>' +
      '<p class="skill-sub">'  + skill.sub  + '</p>';

    grid.appendChild(card);
  });

  refreshIcons();
  observeNewReveals(grid);
}


/* ─────────────────────────────────────────────────────────────────
   5. BUILD PROJECT CARDS — 3-column grid
      Each card: emoji icon, type badge, Inter-800 title,
      bullet list with indigo dots, .badge pills, GitHub link.
   ─────────────────────────────────────────────────────────────────*/
function buildProjects() {
  var grid = document.getElementById("projectsGrid");
  if (!grid) return;

  PROJECTS.forEach(function (proj, i) {

    /* Build bullet list */
    var bulletsHtml = proj.bullets.map(function (b) {
      return (
        '<li>' +
          '<span class="pc-bullet-dot" aria-hidden="true"></span>' +
          '<span>' + b + '</span>' +
        '</li>'
      );
    }).join("");

    /* Build badge pills */
    var badgesHtml = proj.badges.map(function (b) {
      return '<span class="badge">' + b + '</span>';
    }).join("");

    /* Assemble card */
    var card = document.createElement("article");
    card.className = "project-card reveal";
    card.setAttribute("role", "listitem");
    card.setAttribute("data-stripe", proj.stripe);
    card.setAttribute("data-rd", String(i * 110));

    card.innerHTML =
      /* Header */
      '<div class="pc-head">' +
        '<div class="pc-emoji" aria-hidden="true">' + proj.emoji + '</div>' +
        '<span class="pc-type-badge">' + proj.type + '</span>' +
      '</div>' +

      /* Title */
      '<h3 class="pc-title">' + proj.title + '</h3>' +

      /* Bullets */
      '<ul class="pc-bullets" aria-label="' + proj.title + ' highlights">' +
        bulletsHtml +
      '</ul>' +

      /* Footer: badges + GitHub */
      '<div class="pc-footer">' +
        '<div class="badge-row" aria-label="Technologies used">' + badgesHtml + '</div>' +
        '<a href="' + proj.github + '" ' +
           'target="_blank" ' +
           'rel="noopener noreferrer" ' +
           'class="pc-gh-link" ' +
           'aria-label="View ' + proj.title + ' code on GitHub">' +
          '<i data-lucide="git-branch" width="14" height="14"></i>' +
          'View Code' +
        '</a>' +
      '</div>';

    grid.appendChild(card);
  });

  refreshIcons();
  observeNewReveals(grid);
}


/* ─────────────────────────────────────────────────────────────────
   6. BUILD CERTIFICATIONS
      Primary cert (Entri Elevate) gets a featured yellow tag
      and the Illinois badge UI highlight.
   ─────────────────────────────────────────────────────────────────*/
function buildCertifications() {
  var grid = document.getElementById("certsGrid");
  if (!grid) return;

  CERTIFICATIONS.forEach(function (cert, i) {
    var card = document.createElement("div");
    card.className = "cert-card reveal" + (cert.featured ? " is-featured" : "");
    card.setAttribute("role", "listitem");
    card.setAttribute("data-rd", String(i * 100));

    /* Featured badge (only for primary cert) */
    var featuredTag = cert.featured
      ? '<div class="cert-featured-tag">' +
          '<i data-lucide="star" width="12" height="12"></i>' +
          ' Core Credential' +
        '</div>'
      : "";

    /* Illinois badge highlight strip */
    var illinoisBadge = cert.illioisBadge
      ? '<div class="cert-illinois-badge">' +
          '<i data-lucide="badge-check" width="14" height="14"></i>' +
          'Includes Illinois Programme Badge — Verified Credential' +
        '</div>'
      : "";

    card.innerHTML =
      '<div class="cert-icon-wrap">' +
        '<i data-lucide="' + cert.icon + '" width="24" height="24"></i>' +
      '</div>' +

      '<div class="cert-content">' +
        featuredTag +
        '<p class="cert-issued-by">' + cert.issuedBy + '</p>' +
        '<p class="cert-name">' + cert.name + '</p>' +
        '<p class="cert-desc">' + cert.desc + '</p>' +
        illinoisBadge +
      '</div>';

    grid.appendChild(card);
  });

  refreshIcons();
  observeNewReveals(grid);
}


/* ─────────────────────────────────────────────────────────────────
   7. BUILD TIMELINE — reusable for Experience and Education
   ─────────────────────────────────────────────────────────────────*/
function buildTimeline(containerId, data) {
  var wrap = document.getElementById(containerId);
  if (!wrap) return;

  data.forEach(function (item, i) {
    var isLast = (i === data.length - 1);

    var entry = document.createElement("div");
    entry.className = "tl-item reveal";
    entry.setAttribute("data-rd", String(i * 90));

    entry.innerHTML =
      '<div class="tl-marker" aria-hidden="true">' +
        '<div class="tl-dot"></div>' +
        (!isLast ? '<div class="tl-stem"></div>' : "") +
      '</div>' +
      '<div class="tl-body">' +
        '<p class="tl-period">' + item.period + '</p>' +
        '<p class="tl-role">'   + item.role   + '</p>' +
        '<p class="tl-org">'    + item.org    + '</p>' +
        '<p class="tl-desc">'   + item.desc   + '</p>' +
      '</div>';

    wrap.appendChild(entry);
  });

  observeNewReveals(wrap);
}


/* ─────────────────────────────────────────────────────────────────
   8. CONTACT FORM
      Email: ragikrishnakrish01@gmail.com
      Replace the setTimeout with a real fetch/Formspree call
      when deploying.
   ─────────────────────────────────────────────────────────────────*/
function initContactForm() {
  var form        = document.getElementById("contactForm");
  var submitBtn   = document.getElementById("submitBtn");
  var submitLabel = document.getElementById("submitLabel");
  var successMsg  = document.getElementById("formSuccess");
  if (!form || !submitBtn) return;

  /* High-contrast focus style for fields */
  form.querySelectorAll(".field-input").forEach(function (inp) {
    inp.addEventListener("focus", function () {
      inp.style.borderColor = "var(--color-indigo-mid)";
    });
    inp.addEventListener("blur", function () {
      inp.style.borderColor = "";
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    /* Validate required fields */
    var name  = (document.getElementById("fName")    || {}).value || "";
    var email = (document.getElementById("fEmail")   || {}).value || "";
    var msg   = (document.getElementById("fMessage") || {}).value || "";

    if (!name.trim() || !email.trim() || !msg.trim()) {
      return; /* let browser native validation handle it */
    }

    /* Loading state */
    submitBtn.classList.add("is-loading");
    if (submitLabel) submitLabel.textContent = "Sending…";

    /* ── Submit to Formspree ────────────────────────────────── */
    var formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
    .then(function (response) {
      if (response.ok) {
        submitBtn.classList.remove("is-loading");
        submitBtn.classList.add("is-success");
        submitBtn.innerHTML =
          '<i data-lucide="check" width="16" height="16"></i>' +
          '<span>Sent!</span>';
        refreshIcons();

        if (successMsg) { successMsg.classList.add("is-visible"); }
        form.reset();

        /* Restore button after 4s */
        setTimeout(function () {
          submitBtn.classList.remove("is-success");
          submitBtn.innerHTML =
            '<i data-lucide="send" width="16" height="16"></i>' +
            '<span id="submitLabel">Send Message</span>';
          refreshIcons();
          if (successMsg) { successMsg.classList.remove("is-visible"); }
        }, 4000);
      } else {
        submitBtn.classList.remove("is-loading");
        if (submitLabel) submitLabel.textContent = "Send Message";
      }
    })
    .catch(function (error) {
      console.error("Form submission error:", error);
      submitBtn.classList.remove("is-loading");
      if (submitLabel) submitLabel.textContent = "Send Message";
    });
  });
}


/* ─────────────────────────────────────────────────────────────────
   9. BACK TO TOP
   ─────────────────────────────────────────────────────────────────*/
function initBackToTop() {
  var btn = document.getElementById("backTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}



  
