export function initParallax() {
  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
  const mouseItems = [...document.querySelectorAll("[data-mouse-parallax]")];
  if (!parallaxItems.length && !mouseItems.length) return;

  let ticking = false;

  const applyScrollParallax = () => {
    const viewportCenter = window.innerHeight * 0.5;
    parallaxItems.forEach((item) => {
      const ratio = Number(item.getAttribute("data-parallax")) || 0.08;
      const rect = item.getBoundingClientRect();
      const distanceFromCenter = rect.top + rect.height * 0.5 - viewportCenter;
      const y = -distanceFromCenter * ratio;
      item.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    });
  };

  const requestApply = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      applyScrollParallax();
      ticking = false;
    });
  };

  const isTouch =
    window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (!isTouch && mouseItems.length) {
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        tx = nx;
        ty = ny;
      },
      { passive: true }
    );

    const animateMouseParallax = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      mouseItems.forEach((item) => {
        const depth = Number(item.getAttribute("data-mouse-depth")) || 12;
        item.style.setProperty("--mouse-x", `${(mx * depth).toFixed(2)}px`);
        item.style.setProperty("--mouse-y", `${(my * depth).toFixed(2)}px`);
      });
      requestAnimationFrame(animateMouseParallax);
    };

    requestAnimationFrame(animateMouseParallax);
  }

  window.addEventListener("scroll", requestApply, { passive: true });
  window.addEventListener("resize", requestApply);
  requestApply();
}
