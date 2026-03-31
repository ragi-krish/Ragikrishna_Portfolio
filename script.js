/* ════════════════════════════════════════════════════════════════
   RAGIKRISHNA RADHAKRISHNAN — Portfolio · script.js
   Vanilla JS · no build step · zero dependencies
   ════════════════════════════════════════════════════════════════ */

"use strict";

/* ── Data ─────────────────────────────────────────────────────── */
const SKILLS = [
  { icon: "terminal",         name: "Python",       sub: "Data pipelines, automation, scripting" },
  { icon: "database",         name: "SQL",           sub: "PostgreSQL, MySQL, complex queries"    },
  { icon: "bar-chart-2",      name: "Power BI",      sub: "DAX, Power Query, dashboards"          },
  { icon: "cpu",              name: "Scikit-learn",  sub: "Random Forest, Gradient Boosting, SMOTE"},
  { icon: "file-spreadsheet", name: "Pandas",        sub: "EDA, data wrangling, aggregation"      },
  { icon: "pie-chart",        name: "Matplotlib",    sub: "Seaborn, statistical visualisations"   },
  { icon: "layers",           name: "ML Pipelines",  sub: "Joblib, model serialisation, tuning"   },
  { icon: "code-2",           name: "Data Wrangling",sub: "NumPy, ETL, feature engineering"       },
];

const PROJECTS = [
  {
    num:     "01",
    icon:    "🧬",
    accent:  "blue",
    title:   "Diabetes Indicator Prediction",
    type:    "Machine Learning",
    desc:    "Developed an end-to-end ML pipeline achieving 90% Accuracy and 0.90+ ROC-AUC for diabetes classification. Applied SMOTE to resolve class imbalance and serialised the final model with Joblib for production deployment.",
    highlights: ["SMOTE class balancing", "Random Forest + Gradient Boosting", "Joblib production model"],
    tags:    ["Python", "Scikit-learn", "SMOTE", "Joblib", "Pandas"],
  },
  {
    num:     "02",
    icon:    "📊",
    accent:  "green",
    title:   "Employee Data Analysis",
    type:    "Python · EDA",
    desc:    "Performed a deep-dive exploratory data analysis on workforce attrition and salary trends. Engineered HR-centric visualisations using Seaborn and Matplotlib to surface actionable retention insights.",
    highlights: ["Attrition trend analysis", "Seaborn & Matplotlib visuals", "Salary benchmarking"],
    tags:    ["Python", "Pandas", "Seaborn", "Matplotlib", "EDA"],
  },
  {
    num:     "03",
    icon:    "🌍",
    accent:  "violet",
    title:   "Global COVID-19 Analytics",
    type:    "Power BI · Dashboard",
    desc:    "Engineered a high-impact Power BI dashboard leveraging Advanced DAX measures and Power Query for data transformation. Features interactive time-series charts and granular KPI tracking across 180+ countries.",
    highlights: ["Advanced DAX measures", "Power Query ETL", "Interactive time-series"],
    tags:    ["Power BI", "DAX", "Power Query", "Data Modelling"],
  },
];

const EXPERIENCE = [
  {
    period: "Nov 2022 – Present",
    role:   "Python Instructor",
    org:    "Edoxi Training Institute",
    desc:   "Delivering real-world Python, Data Science and ML curricula to professional cohorts. Bridging theory and production-grade practice through hands-on project-based learning.",
  },
  {
    period: "2019 – 2020",
    role:   "Apprentice — Computer Engineering",
    org:    "Sree Chitra Tirunal Institute",
    desc:   "Gained hands-on exposure to applied computing systems, technical documentation and engineering processes in a research and development environment.",
  },
];

const EDUCATION = [
  {
    period: "2013 – 2017",
    role:   "BTech — Computer Engineering",
    org:    "University (Kerala, India)",
    desc:   "Bachelor of Technology with focus on algorithms, databases, networks and software engineering fundamentals.",
  },
];

/* ════════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initCursor();
  initNavbar();
  initTheme();
  initReveal();
  buildSkills();
  buildStackedCards();
  initStackedScroll();
  buildTimeline("expTimeline", EXPERIENCE);
  buildTimeline("eduTimeline", EDUCATION);
  initContact();
  initBackTop();
  initHoverHints();
});

/* ════════════════════════════════════════════════════════════════
   1. CUSTOM CURSOR
   ════════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;

  document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    dot.style.left  = mx + "px";
    dot.style.top   = my + "px";
    ring.style.left = rx + "px";
    ring.style.top  = ry + "px";
    requestAnimationFrame(animRing);
  }
  animRing();
}

function initHoverHints() {
  document.querySelectorAll("a, button, .skill-card, .proj-card, .c-link, .field-input, textarea").forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

/* ════════════════════════════════════════════════════════════════
   2. NAVBAR — glass on scroll + mobile hamburger
   ════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar   = document.getElementById("navbar");
  const burger   = document.getElementById("burgerBtn");
  const menuIco  = document.getElementById("menuIco");
  const closeIco = document.getElementById("closeIco");
  const mobileMenu = document.getElementById("mobileMenu");
  let open = false;

  /* Scroll glass */
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hamburger */
  burger.addEventListener("click", () => {
    open = !open;
    mobileMenu.style.display = open ? "flex" : "none";
    menuIco.style.display    = open ? "none" : "";
    closeIco.style.display   = open ? ""     : "none";
  });

  /* Close on link click */
  mobileMenu.querySelectorAll(".mob-link").forEach(link => {
    link.addEventListener("click", () => {
      open = false;
      mobileMenu.style.display = "none";
      menuIco.style.display    = "";
      closeIco.style.display   = "none";
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   3. DARK / LIGHT THEME
   ════════════════════════════════════════════════════════════════ */
function initTheme() {
  const toggles = [
    document.getElementById("themeToggle"),
    document.getElementById("themeToggleDesktop"),
  ].filter(Boolean);

  /* Respect system preference on first load */
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("rr-theme");
  if (saved === "dark" || (!saved && prefersDark)) applyDark(true);

  toggles.forEach(btn => btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("rr-theme", isDark ? "dark" : "light");
    applyDark(isDark);
  }));
}

function applyDark(on) {
  document.body.classList.toggle("dark", on);
  document.querySelectorAll(".moon-ico").forEach(el => el.style.display = on ? "none" : "");
  document.querySelectorAll(".sun-ico") .forEach(el => el.style.display = on ? ""     : "none");
}

/* ════════════════════════════════════════════════════════════════
   4. SCROLL REVEAL
   ════════════════════════════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const delay = parseInt(target.dataset.delay || "0", 10);
      setTimeout(() => target.classList.add("visible"), delay);
      io.unobserve(target);
    });
  }, { threshold: 0.10 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* Re-observe any newly added .reveal nodes (for dynamically built sections) */
function observeNew(container) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      const delay = parseInt(target.dataset.delay || "0", 10);
      setTimeout(() => target.classList.add("visible"), delay);
      io.unobserve(target);
    });
  }, { threshold: 0.10 });
  container.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

/* ════════════════════════════════════════════════════════════════
   5. SKILLS GRID
   ════════════════════════════════════════════════════════════════ */
function buildSkills() {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  SKILLS.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.dataset.delay = i * 55;

    const ico  = document.createElement("i");
    ico.setAttribute("data-lucide", s.icon);
    ico.setAttribute("width", "20");
    ico.setAttribute("height", "20");

    card.innerHTML = `
      <div class="skill-icon"></div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-sub">${s.sub}</div>
    `;
    card.querySelector(".skill-icon").appendChild(ico);
    grid.appendChild(card);
  });

  lucide.createIcons();
  observeNew(grid);
}

/* ════════════════════════════════════════════════════════════════
   6. STACKED PROJECT CARDS
   ════════════════════════════════════════════════════════════════ */
const cardEls = [];

function buildStackedCards() {
  const stage     = document.getElementById("stackedStage");
  const progress  = document.getElementById("stackProgress");
  const container = document.getElementById("stackedContainer");
  if (!stage || !container) return;

  /* Height: 110vh per card so scroll feels weighty */
  container.style.height = `${PROJECTS.length * 110}vh`;

  PROJECTS.forEach((p, i) => {
    /* Progress dot */
    const dot = document.createElement("div");
    dot.className = `sp-dot ${i === 0 ? "active" : "inactive"}`;
    dot.id = `sp-${i}`;
    progress && progress.appendChild(dot);

    /* Card */
    const card = document.createElement("div");
    card.className = "proj-card";
    card.dataset.accent = p.accent;
    card.dataset.index  = i;

    const highlightsHtml = p.highlights.map(h =>
      `<span class="proj-hl">${h}</span>`
    ).join("");

    const tagsHtml = p.tags.map(t =>
      `<span class="proj-tag">${t}</span>`
    ).join("");

    card.innerHTML = `
      <div>
        <div class="proj-top">
          <div class="proj-meta">
            <div class="proj-num">${p.type} &nbsp;/&nbsp; ${p.num}</div>
            <div class="proj-title">${p.title}</div>
          </div>
          <div class="proj-icon-box">${p.icon}</div>
        </div>
        <p class="proj-desc">${p.desc}</p>
        <div class="proj-highlights">${highlightsHtml}</div>
      </div>
      <div class="proj-bottom">
        <div class="proj-tags">${tagsHtml}</div>
        <a href="#" class="btn-outline" style="padding:10px 20px;font-size:13px;gap:7px">
          <i data-lucide="external-link" width="14" height="14"></i>
          View
        </a>
      </div>
    `;

    stage.appendChild(card);
    cardEls.push(card);
  });

  lucide.createIcons();
}

/* ════════════════════════════════════════════════════════════════
   7. STACKED SCROLL ANIMATION
   ════════════════════════════════════════════════════════════════ */
function initStackedScroll() {
  const container = document.getElementById("stackedContainer");
  if (!container) return;
  window.addEventListener("scroll", () => tickStack(container), { passive: true });
  tickStack(container);
}

function tickStack(container) {
  const rect     = container.getBoundingClientRect();
  const total    = container.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;
  const progress = Math.max(0, Math.min(1, scrolled / total));

  const count    = PROJECTS.length;
  const slot     = 1 / count;

  cardEls.forEach((card, i) => {
    const start  = i * slot;
    const end    = start + slot;
    const local  = Math.max(0, Math.min(1, (progress - start) / slot));
    const dir    = i % 2 === 0 ? 1 : -1;

    let ty, scale, opacity, z, rotate;

    if (progress < start) {
      /* Waiting in stack below */
      const dist = i - Math.floor(progress / slot);
      ty      = 50 + dist * 10;
      scale   = 1 - dist * 0.035;
      opacity = dist <= 1 ? 0.85 : 0.55;
      z       = i;
      rotate  = dir * dist * 1.2;
    } else if (progress < end) {
      /* Active — rising */
      ty      = -(local * 70);
      scale   = 1 - local * 0.045;
      opacity = 1 - local * 0.45;
      z       = 50 + i;
      rotate  = dir * local * 1.8;
    } else {
      /* Done — flicked away */
      ty      = -110;
      scale   = 0.90;
      opacity = 0;
      z       = i;
      rotate  = dir * 2.5;
    }

    card.style.transform = `translateY(${ty}px) scale(${scale}) rotate(${rotate}deg)`;
    card.style.opacity   = opacity;
    card.style.zIndex    = z;

    /* Progress dots */
    const dot = document.getElementById(`sp-${i}`);
    if (dot) {
      const isActive = progress >= start && progress < end;
      const isPast   = progress >= end;
      dot.classList.toggle("active",   isActive);
      dot.classList.toggle("inactive", !isActive);
      if (isPast) dot.style.opacity = "0.35";
      else        dot.style.opacity = "";
    }
  });
}

/* ════════════════════════════════════════════════════════════════
   8. TIMELINE BUILDER
   ════════════════════════════════════════════════════════════════ */
function buildTimeline(containerId, data) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  data.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "tl-item reveal";
    row.dataset.delay = i * 100;

    row.innerHTML = `
      <div class="tl-dot-wrap">
        <div class="tl-dot"></div>
        ${i < data.length - 1 ? '<div class="tl-line"></div>' : ""}
      </div>
      <div class="tl-body">
        <div class="tl-period">${item.period}</div>
        <div class="tl-role">${item.role}</div>
        <div class="tl-org">${item.org}</div>
        <p class="tl-desc">${item.desc}</p>
      </div>
    `;

    wrap.appendChild(row);
  });

  observeNew(wrap);
}

/* ════════════════════════════════════════════════════════════════
   9. CONTACT FORM
   ════════════════════════════════════════════════════════════════ */
function initContact() {
  const form    = document.getElementById("contactForm");
  const btn     = document.getElementById("submitBtn");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  /* High-contrast focus ring */
  form.querySelectorAll(".field-input").forEach(f => {
    f.addEventListener("focus", () => f.style.borderColor = "var(--accent)");
    f.addEventListener("blur",  () => f.style.borderColor = "");
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();

    /* Loading state */
    btn.textContent = "";
    btn.innerHTML = `<i data-lucide="loader" width="16" height="16"></i> Sending…`;
    btn.classList.add("loading");
    lucide.createIcons();
    btn.disabled = true;

    /* Simulate send (replace with real fetch/formspree) */
    await new Promise(r => setTimeout(r, 1500));

    /* Success */
    btn.classList.remove("loading");
    btn.classList.add("success");
    btn.innerHTML = `<i data-lucide="check" width="16" height="16"></i> Sent!`;
    lucide.createIcons();

    if (success) success.style.display = "flex";
    form.querySelectorAll("input, textarea").forEach(f => f.value = "");

    setTimeout(() => {
      btn.disabled = false;
      btn.classList.remove("success");
      btn.innerHTML = `<i data-lucide="send" width="16" height="16"></i> Send Message`;
      if (success) success.style.display = "none";
      lucide.createIcons();
    }, 4000);
  });
}

/* ════════════════════════════════════════════════════════════════
   10. BACK TO TOP
   ════════════════════════════════════════════════════════════════ */
function initBackTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 500;
    btn.style.opacity        = show ? "1"    : "0";
    btn.style.pointerEvents  = show ? "auto" : "none";
  }, { passive: true });

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
