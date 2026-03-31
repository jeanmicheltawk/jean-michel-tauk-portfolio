export function lazyLoadSections() {
  const heavySections = [...document.querySelectorAll("#experience, #projects, #ai")];
  if (!heavySections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-mounted");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "140px" }
  );

  heavySections.forEach((section) => observer.observe(section));
}

export function lazyLoadEffects() {
  const lazyImport = (fn) => ("requestIdleCallback" in window ? requestIdleCallback(fn) : setTimeout(fn, 200));

  lazyImport(async () => {
    const { initCursorGlow } = await import("./cursor.js");
    initCursorGlow();
  });

  lazyImport(async () => {
    const { initParticles } = await import("./particles.js");
    initParticles();
  });
}
