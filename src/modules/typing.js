export function initTyping({ element, phrases, speed = 70, pause = 1200 }) {
  if (!element || !phrases?.length) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!current) return;

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    element.textContent = current.slice(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
        tick();
      }, pause);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const delay = isDeleting ? speed * 0.5 : speed;
    window.setTimeout(tick, delay);
  }

  tick();
}
