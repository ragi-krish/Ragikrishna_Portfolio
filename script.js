/* ═══════════════════════════════════════════════════════════════════
   Ragikrishna Radhakrishnan — Portfolio  |  script.js
   Complete Rebuild 2025 — Vanilla JS, zero build step
   ═══════════════════════════════════════════════════════════════════ */
"use strict";

/* ─────────────────────────────────────────────────────────────────
   DATA
   ─────────────────────────────────────────────────────────────────*/
const SKILLS = [
  { icon: "terminal",          name: "Python",        sub: "Automation, scripting, data pipelines"   },
  { icon: "database",          name: "SQL",            sub: "PostgreSQL, MySQL, complex queries"       },
  { icon: "bar-chart-2",       name: "Power BI",       sub: "DAX, Power Query, interactive dashboards" },
  { icon: "cpu",               name: "Scikit-learn",   sub: "Random Forest, SVM, Gradient Boosting"   },
  { icon: "table-2",           name: "Pandas",         sub: "EDA, data wrangling, aggregation"        },
  { icon: "activity",          name: "Matplotlib",     sub: "Seaborn, statistical visualisations"     },
  { icon: "layers",            name: "ML Pipelines",   sub: "SMOTE, Joblib, model serialisation"      },
  { icon: "code-2",            name: "Data Engineering",sub: "ETL, NumPy, feature engineering"        },
];

const PROJECTS = [
  {
    emoji:   "🧬",
    accent:  "blue",
    type:    "Machine Learning",
    title:   "Diabetes Prediction ML",
    bullets: [
      "Achieved <strong>90% Accuracy</strong> and <strong>0.90+ ROC-AUC</strong> on held-out test data.",
      "Applied <strong>SMOTE</strong> oversampling to resolve class imbalance in the training set.",
      "Trained <strong>Random Forest</strong> and Gradient Boosting ensembles with cross-validation.",
      "Serialised final pipeline via <strong>Joblib</strong> for production deployment.",
    ],
    badges: ["Python", "Scikit-learn", "SMOTE", "Joblib", "Pandas"],
    github: "https://github.com/ragi-krish",
  },
  {
    emoji:   "📊",
    accent:  "emerald",
    type:    "Python · EDA",
    title:   "Employee Attrition Analytics",
    bullets: [
      "Identified key <strong>retention factors</strong> via deep-dive EDA on workforce data.",
      "Visualised <strong>salary distributions</strong> and attrition trends using Seaborn & Matplotlib.",
      "Surfaced actionable HR insights to reduce voluntary churn rate.",
    ],
    badges: ["Python", "Pandas", "Seaborn", "Matplotlib", "EDA"],
    github: "https://github.com/ragi-krish",
  },
  {
    emoji:   "🌍",
    accent:  "violet",
    type:    "Power BI · Dashboard",
    title:   "Global COVID-19 Analytics",
    bullets: [
      "Built a high-impact Power BI dashboard with <strong>Advanced DAX</strong> measures.",
      "Automated data ingestion via <strong>Power Query ETL</strong> across 180+ countries.",
      "Implemented dynamic <strong>time-series tracking</strong> for global mortality & recovery KPIs.",
    ],
    badges: ["Power BI", "DAX", "Power Query", "ETL", "Data Modelling"],
    github: "https://github.com/ragi-krish",
  },
];

const EXPERIENCE = [
  {
    period: "Nov 2022 – Present",
    role:   "Python Instructor",
    org:    "Edoxi Training Institute",
    desc:   "Delivering real-world Python, Data Science, and ML curricula. Mentoring professional cohorts through hands-on, project-based learning that bridges theory and production-grade practice.",
  },
  {
    period: "2019 – 2020",
    role:   "Apprentice — Computer Engineering",
    org:    "Sree Chitra Tirunal Institute",
    desc:   "Gained practical exposure to applied computing systems, technical documentation, and engineering processes within a leading research and development environment.",
  },
];

const EDUCATION = [
  {
    period: "2013 – 2017",
    role:   "BTech — Computer Engineering",
    org:    "University, Kerala, India",
    desc:   "Bachelor of Technology with focus on algorithms, databases, networks, and software engineering fundamentals.",
  },
];


/* ─────────────────────────────────────────────────────────────────
   INIT — wait for DOM then fire each module in order
   ─────────────────────────────────────────────────────────────────*/
document.addEventListener("DOMContentLoaded", () => {
  /* Render all <i data-lucide="..."> elements already in the HTML */
  if (window.lucide) lucide.createIcons();

  initTheme();
  initNavbar();
  initScrollReveal();
  buildSkillsGrid();
  buildProjectGrid();
  buildTimeline("expList",  EXPERIENCE);
  buildTimeline("eduList",  EDUCATION);
  initContactForm();
  initBackToTop();
});


/* ─────────────────────────────────────────────────────────────────
   1. THEME — light / dark toggle, persists to localStorage
   ─────────────────────────────────────────────────────────────────*/
function initTheme() {
  const btn  = document.getElementById("themeBtn");
  const body = document.body;

  /* Respect system preference on first visit */
  const saved = localStorage.getItem("rk-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) body.classList.add("dark");

  btn && btn.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("rk-theme", body.classList.contains("dark") ? "dark" : "light");
  });
}


/* ─────────────────────────────────────────────────────────────────
   2. NAVBAR — glass blur on scroll + mobile hamburger
   ─────────────────────────────────────────────────────────────────*/
function initNavbar() {
  const nav    = document.getElementById("navbar");
  const burger = document.getElementById("menuBtn");
  const drawer = document.getElementById("mobileDrawer");

  /* Scroll glass effect */
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 44);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hamburger toggle */
  let drawerOpen = false;
  const toggleDrawer = (open) => {
    drawerOpen = open;
    drawer.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
  };

  burger && burger.addEventListener("click", () => toggleDrawer(!drawerOpen));

  /* Close drawer when a link is clicked */
  drawer && drawer.querySelectorAll(".mob-link").forEach(a =>
    a.addEventListener("click", () => toggleDrawer(false))
  );

  /* Close on outside click */
  document.addEventListener("click", (e) => {
    if (drawerOpen && !nav.contains(e.target)) toggleDrawer(false);
  });
}


/* ─────────────────────────────────────────────────────────────────
   3. SCROLL REVEAL — IntersectionObserver adds .visible to .reveal
   ─────────────────────────────────────────────────────────────────*/
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const delay = parseInt(target.dataset.d || "0", 10);
      setTimeout(() => target.classList.add("visible"), delay);
      io.unobserve(target);
    });
  }, { threshold: 0.10 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* Helper: observe newly injected .reveal elements */
function observeReveal(root) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const delay = parseInt(target.dataset.d || "0", 10);
      setTimeout(() => target.classList.add("visible"), delay);
      io.unobserve(target);
    });
  }, { threshold: 0.10 });

  root.querySelectorAll(".reveal").forEach(el => io.observe(el));
}


/* ─────────────────────────────────────────────────────────────────
   4. SKILLS GRID
   ─────────────────────────────────────────────────────────────────*/
function buildSkillsGrid() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  SKILLS.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.setAttribute("role", "listitem");
    card.dataset.d = String(i * 60);

    /* We build the inner markup with a placeholder for the icon */
    card.innerHTML = `
      <div class="skill-icon-wrap">
        <i data-lucide="${s.icon}" width="20" height="20"></i>
      </div>
      <p class="skill-name">${s.name}</p>
      <p class="skill-sub">${s.sub}</p>
    `;

    grid.appendChild(card);
  });

  /* Render the newly added Lucide icons */
  if (window.lucide) lucide.createIcons();
  observeReveal(grid);
}


/* ─────────────────────────────────────────────────────────────────
   5. PROJECT GRID — 3-column cards with bullets and .badge pills
   ─────────────────────────────────────────────────────────────────*/
function buildProjectGrid() {
  const grid = document.getElementById("projGrid");
  if (!grid) return;

  PROJECTS.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.setAttribute("role", "listitem");
    card.dataset.accent = p.accent;
    card.dataset.d = String(i * 110);

    /* Bullet items */
    const bulletsHTML = p.bullets
      .map(b => `<li><span class="pc-dot" aria-hidden="true"></span><span>${b}</span></li>`)
      .join("");

    /* Badge pills */
    const badgesHTML = p.badges
      .map(b => `<span class="badge">${b}</span>`)
      .join("");

    card.innerHTML = `
      <!-- Header: emoji icon + category badge -->
      <div class="pc-head">
        <div class="pc-emoji" aria-hidden="true">${p.emoji}</div>
        <span class="pc-type">${p.type}</span>
      </div>

      <!-- Project title — Inter 800 -->
      <h3 class="pc-title">${p.title}</h3>

      <!-- Bullet-point highlights -->
      <ul class="pc-bullets" aria-label="${p.title} highlights">
        ${bulletsHTML}
      </ul>

      <!-- Footer: tech badges + GitHub link -->
      <div class="pc-footer">
        <div class="badge-row" aria-label="Technologies used">
          ${badgesHTML}
        </div>
        <a href="${p.github}"
           target="_blank"
           rel="noopener noreferrer"
           class="pc-github"
           aria-label="View ${p.title} source code on GitHub">
          <i data-lucide="github" width="14" height="14"></i>
          View Code
        </a>
      </div>
    `;

    grid.appendChild(card);
  });

  if (window.lucide) lucide.createIcons();
  observeReveal(grid);
}


/* ─────────────────────────────────────────────────────────────────
   6. TIMELINE BUILDER — used for both Experience and Education
   ─────────────────────────────────────────────────────────────────*/
function buildTimeline(containerId, data) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  data.forEach((item, i) => {
    const isLast = i === data.length - 1;

    const entry = document.createElement("div");
    entry.className = "tl-item reveal";
    entry.dataset.d = String(i * 90);

    entry.innerHTML = `
      <div class="tl-indicator" aria-hidden="true">
        <div class="tl-dot"></div>
        ${!isLast ? '<div class="tl-stem"></div>' : ""}
      </div>
      <div class="tl-body">
        <p class="tl-period">${item.period}</p>
        <p class="tl-role">${item.role}</p>
        <p class="tl-org">${item.org}</p>
        <p class="tl-desc">${item.desc}</p>
      </div>
    `;

    wrap.appendChild(entry);
  });

  observeReveal(wrap);
}


/* ─────────────────────────────────────────────────────────────────
   7. CONTACT FORM — validation + simulated send
   ─────────────────────────────────────────────────────────────────*/
function initContactForm() {
  const form       = document.getElementById("contactForm");
  const submitBtn  = document.getElementById("submitBtn");
  const submitLbl  = document.getElementById("submitLabel");
  const successMsg = document.getElementById("formSuccess");
  if (!form) return;

  /* Focus gold border on inputs */
  form.querySelectorAll(".field-input").forEach(input => {
    input.addEventListener("focus", () => (input.style.borderColor = "var(--indigo-mid)"));
    input.addEventListener("blur",  () => (input.style.borderColor = ""));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* Basic validation */
    const name  = form.querySelector("#f-name").value.trim();
    const email = form.querySelector("#f-email").value.trim();
    const msg   = form.querySelector("#f-msg").value.trim();
    if (!name || !email || !msg) return;

    /* Loading state */
    submitBtn.classList.add("loading");
    submitLbl.textContent = "Sending…";
    if (window.lucide) lucide.createIcons();

    /* Simulated async send (replace with fetch/Formspree in production) */
    await new Promise(r => setTimeout(r, 1500));

    /* Success state */
    submitBtn.classList.remove("loading");
    submitBtn.classList.add("success");
    submitLbl.textContent = "Sent!";
    successMsg.classList.add("visible");

    /* Reset icon */
    submitBtn.innerHTML = `
      <i data-lucide="check" width="16" height="16"></i>
      <span id="submitLabel">Sent!</span>
    `;
    if (window.lucide) lucide.createIcons();

    /* Clear and restore after 4 s */
    setTimeout(() => {
      form.reset();
      submitBtn.classList.remove("success");
      successMsg.classList.remove("visible");
      submitBtn.innerHTML = `
        <i data-lucide="send" width="16" height="16"></i>
        <span id="submitLabel">Send Message</span>
      `;
      if (window.lucide) lucide.createIcons();
    }, 4000);
  });
}


/* ─────────────────────────────────────────────────────────────────
   8. BACK TO TOP
   ─────────────────────────────────────────────────────────────────*/
function initBackToTop() {
  const btn = document.getElementById("backTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}
