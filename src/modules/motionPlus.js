export function initMotionPlus() {
  const root = document.documentElement;
  const sections = [...document.querySelectorAll("main .section")];
  const timeline = document.getElementById("timeline");

  let lastY = window.scrollY;
  let velocity = 0;
  let ticking = false;

  const updateScrollVars = () => {
    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, y / max));
    velocity = velocity * 0.82 + Math.min(1, Math.abs(y - lastY) / 60) * 0.18;
    lastY = y;

    root.style.setProperty("--scroll-progress", progress.toFixed(4));
    root.style.setProperty("--scroll-velocity", velocity.toFixed(4));

    if (timeline) {
      const rect = timeline.getBoundingClientRect();
      const total = rect.height + window.innerHeight * 0.55;
      const done = window.innerHeight * 0.45 - rect.top;
      const t = Math.min(1, Math.max(0, done / Math.max(1, total)));
      timeline.style.setProperty("--timeline-progress", t.toFixed(4));
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateScrollVars();
      ticking = false;
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-inview", entry.isIntersecting);
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const cards = [...document.querySelectorAll(".glass-card, .stack-card, .timeline-item, .project-card")];
  cards.forEach((card, idx) => {
    card.style.setProperty("--stagger", String((idx % 8) * 0.06));
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updateScrollVars();
}
