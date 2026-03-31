const animateCounter = (el) => {
  const target = Number(el.dataset.target || 0);
  if (!target) return;

  const duration = 1300;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);

    if (target === 100) {
      el.textContent = `${value}%`;
    } else if (target === 60) {
      el.textContent = `${value}%`;
    } else {
      el.textContent = `${value}+`;
    }

    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

export function initCounters() {
  const counters = [...document.querySelectorAll(".counter")];
  if (!counters.length) return;

  const hasObserver = "IntersectionObserver" in window;

  // JS-enabled baseline before animating.
  counters.forEach((counter) => {
    counter.textContent = "0";
  });

  if (!hasObserver) {
    counters.forEach((counter) => animateCounter(counter));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((counter) => observer.observe(counter));
}
