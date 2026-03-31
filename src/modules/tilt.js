export function initMouseTilt() {
  const magnetic = [...document.querySelectorAll(".magnetic")];
  const cards = [...document.querySelectorAll(".glass-card, .stack-card, .project-card")];

  magnetic.forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });
  });

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - py) * 6;
      const rotateY = (px - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}
