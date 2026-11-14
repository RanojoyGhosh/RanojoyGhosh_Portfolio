/* =====================================================================
   RANOJOY GHOSH — portfolio script
   Everything you are likely to edit is in the SETTINGS block below.
   ===================================================================== */

/* ---------- SETTINGS ---------- */

// WhatsApp number: country code + number, digits only.
const WHATSAPP = "919382290197";
const WA_GREETING = "Hi Ranojoy, I saw your portfolio and want to discuss a video project.";

// To add a project, add ONE object here. Put its files in /assets.
//   video   = full video, played with sound when the clip is tapped
//   preview = short silent loop shown on the page (optional; falls back to video)
//   poster  = still image shown before anything loads
const PROJECTS = [
  {
    title: "Podcast Clips — Madhuparna Sreemany, CEO, Pathfinder Institute",
    category: "Podcast",
    description: "Short-form podcast clips with animated captions, speaker lower-thirds and hook-first pacing built for Reels & Shorts.",
    length: "0:47",
    video: "assets/podcast-clip.mp4",
    preview: "assets/podcast-clip-preview.mp4",
    poster: "assets/podcast-clip-poster.jpg",
  },
  {
    title: "Color Grading — Independence Day reel",
    category: "Color Grading",
    description: "A graded talking-head reel: balanced skin tones, cinematic contrast, map animations and Bengali titles that match the story.",
    length: "0:19",
    video: "assets/color-grading.mp4",
    preview: "assets/color-grading-preview.mp4",
    poster: "assets/color-grading-poster.jpg",
  },
  {
    title: "AI Video Editing — Freelancing Series (Bengali)",
    category: "AI Editing",
    description: "Talking-head reel enhanced with AI tools: auto-captions in Bengali, branded name tags and fast, retention-focused cuts.",
    length: "1:55",
    video: "assets/ai-editing.mp4",
    preview: "assets/ai-editing-preview.mp4",
    poster: "assets/ai-editing-poster.jpg",
  },
];

// Stats: fill in REAL numbers to show this block, e.g. { value: "120+", label: "Videos edited" }.
// While every value is empty the block stays hidden.
const STATS = [
  { value: "", label: "Videos edited" },
  { value: "", label: "Happy clients" },
  { value: "", label: "Years editing" },
];

// Testimonials: add REAL client quotes to show this section, e.g.
//   { quote: "…", name: "Client name", role: "Role, Company" }
const TESTIMONIALS = [];

/* ---------- HELPERS ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const waUrl = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Every element marked data-wa opens a WhatsApp chat with the greeting filled in.
$$("[data-wa]").forEach((a) => {
  a.href = waUrl(WA_GREETING);
  a.target = "_blank";
  a.rel = "noopener";
});

/* ---------- WORK: build clips from PROJECTS ---------- */
const reels = $("#reels");
const filters = $("#filters");
let activeFilter = "All";

function renderReels() {
  const list = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);
  reels.innerHTML = list
    .map(
      (p) => `
    <article class="reel">
      <button class="reel-frame" type="button" data-i="${PROJECTS.indexOf(p)}" aria-label="Play with sound: ${esc(p.title)}">
        <video muted loop playsinline preload="none" poster="${esc(p.poster)}" data-src="${esc(p.preview || p.video)}" tabindex="-1" aria-hidden="true"></video>
        <span class="reel-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
      </button>
      <p class="reel-meta"><span>${esc(p.category)}</span>${p.length ? `<span class="reel-len">${esc(p.length)}</span>` : ""}</p>
      <h3>${esc(p.title)}</h3>
      <p class="reel-desc">${esc(p.description)}</p>
    </article>`
    )
    .join("");
  watchReels();
}

// Filter buttons only appear once there are more projects than fit in one row.
function renderFilters() {
  const cats = [...new Set(PROJECTS.map((p) => p.category))];
  if (PROJECTS.length <= 3 || cats.length < 2) return;
  filters.hidden = false;
  filters.innerHTML = ["All", ...cats]
    .map((c) => `<button type="button" aria-pressed="${c === activeFilter}">${esc(c)}</button>`)
    .join("");
}
filters.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  activeFilter = b.textContent;
  renderFilters();
  renderReels();
});

// Silent previews load and play only while they are on screen.
let reelObserver;
function watchReels() {
  reelObserver?.disconnect();
  if (reduceMotion) return;
  reelObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach(({ target: v, isIntersecting }) => {
        if (isIntersecting) {
          if (!v.src) v.src = v.dataset.src;
          v.play().catch(() => {});
        } else v.pause();
      }),
    { threshold: 0.4 }
  );
  $$("video", reels).forEach((v) => reelObserver.observe(v));
}

renderFilters();
renderReels();

/* ---------- PLAYER: full video with sound ---------- */
const player = $("#player");
const playerVideo = $("#player-video");

reels.addEventListener("click", (e) => {
  const btn = e.target.closest(".reel-frame");
  if (!btn) return;
  const p = PROJECTS[+btn.dataset.i];
  playerVideo.poster = p.poster;
  playerVideo.src = p.video;
  $("#player-title").textContent = p.title;
  player.showModal();
  playerVideo.play().catch(() => {});
});
player.addEventListener("close", () => {
  playerVideo.pause();
  playerVideo.removeAttribute("src");
  playerVideo.load();
});
// Clicking the dark area around the video closes it.
player.addEventListener("click", (e) => {
  if (e.target === player) player.close();
});

/* ---------- STATS + TESTIMONIALS (shown only with real content) ---------- */
const realStats = STATS.filter((s) => s.value);
if (realStats.length) {
  const el = $("#stats");
  el.hidden = false;
  el.innerHTML = realStats.map((s) => `<div><dd>${esc(s.value)}</dd><dt>${esc(s.label)}</dt></div>`).join("");
}
const realQuotes = TESTIMONIALS.filter((t) => t.quote && !t.quote.trim().startsWith("["));
if (realQuotes.length) {
  $("#quotes").hidden = false;
  $("#quote-list").innerHTML = realQuotes
    .map((t) => `<figure><blockquote>${esc(t.quote)}</blockquote><figcaption><strong>${esc(t.name)}</strong>${t.role ? `<span>${esc(t.role)}</span>` : ""}</figcaption></figure>`)
    .join("");
}

/* ---------- TIMELINE BAR: playhead + timecode follow the scroll ---------- */
const track = $("#track");
const playhead = $("#playhead");
const tc = $("#tc");
const segs = $$("a[data-seg]", track).map((a) => ({ a, section: document.getElementById(a.dataset.seg) }));
// The timecode runs to the combined length of the videos on the page.
const totalSeconds = PROJECTS.reduce((sum, p) => {
  const [m, s] = (p.length || "0:00").split(":").map(Number);
  return sum + m * 60 + s;
}, 0) || 60;
const two = (n) => String(Math.floor(n)).padStart(2, "0");

function updateTimeline() {
  const mid = scrollY + innerHeight * 0.4;
  let current = -1;
  let within = 0;
  segs.forEach(({ section }, i) => {
    const top = section.offsetTop;
    if (mid >= top) {
      current = i;
      within = Math.min(1, (mid - top) / section.offsetHeight);
    }
  });
  segs.forEach(({ a }, i) => {
    if (i === current) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
  const pos = current < 0 ? 0 : (current + within) / segs.length;
  playhead.style.left = `${pos * 100}%`;

  const max = document.documentElement.scrollHeight - innerHeight;
  const t = (max > 0 ? Math.min(1, scrollY / max) : 0) * totalSeconds;
  tc.textContent = `00:${two(t / 60)}:${two(t % 60)}:${two((t % 1) * 30)}`;
}
let ticking = false;
addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateTimeline();
      ticking = false;
    });
  },
  { passive: true }
);
addEventListener("resize", updateTimeline);
addEventListener("load", updateTimeline);
updateTimeline();

/* ---------- CONTACT FORM: validate, then open WhatsApp with the details ---------- */
const form = $("#form");
const rules = {
  name: (v) => (v.trim().length < 2 ? "Enter your name." : ""),
  phone: (v) => {
    const d = v.replace(/[\s\-()]/g, "");
    if (!d) return "Enter your WhatsApp or phone number.";
    return /^\+?\d{10,14}$/.test(d) ? "" : "That number looks incomplete. Use 10 digits, or include the country code like +91 98765 43210.";
  },
  message: (v) => (v.trim().length < 10 ? "Add a few words about the project (at least 10 characters)." : ""),
};
function check(name) {
  const input = form.elements[name];
  const msg = rules[name](input.value);
  const err = $(`#e-${name}`);
  err.textContent = msg;
  err.hidden = !msg;
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  if (msg) input.setAttribute("aria-describedby", `e-${name}`);
  else input.removeAttribute("aria-describedby");
  return !msg;
}
Object.keys(rules).forEach((name) => {
  const input = form.elements[name];
  input.addEventListener("blur", () => check(name));
  input.addEventListener("input", () => input.getAttribute("aria-invalid") === "true" && check(name));
});
form.elements.deadline.min = new Date().toISOString().slice(0, 10);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bad = Object.keys(rules).filter((name) => !check(name));
  if (bad.length) {
    form.elements[bad[0]].focus();
    return;
  }
  const f = form.elements;
  const enc = encodeURIComponent;
  const deadline = f.deadline.value
    ? new Date(f.deadline.value + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "Flexible";
  const text =
    `${enc("Hi Ranojoy! 👋 I found your portfolio.")}%0A%0A` +
    `*Name:* ${enc(f.name.value.trim())}%0A*Phone:* ${enc(f.phone.value.trim())}%0A*Project:* ${enc(f.type.value || "Not specified")}%0A` +
    `*Budget:* ${enc(f.budget.value || "Let's discuss")}%0A*Deadline:* ${enc(deadline)}%0A%0A*Details:* ${enc(f.message.value.trim())}`;
  const url = `https://wa.me/${WHATSAPP}?text=${text}`;
  window.open(url, "_blank", "noopener");

  // Success state, with a manual link in case a popup blocker stopped WhatsApp opening.
  $("#form-done-link").href = url;
  $("#form-body").hidden = true;
  $("#form-done").hidden = false;
  setTimeout(() => {
    form.reset();
    $("#form-done").hidden = true;
    $("#form-body").hidden = false;
  }, 10000);
});
