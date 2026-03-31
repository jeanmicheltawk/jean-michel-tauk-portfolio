export function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const particleCount = Math.min(120, Math.round(window.innerWidth * 0.08));
  let particles = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const createParticles = () => {
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.9 + 0.6,
      a: Math.random() * 0.5 + 0.1,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.height + 20;
      if (p.y > canvas.height + 20) p.y = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(11, 61, 34, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const o = particles[j];
        const dx = p.x - o.x;
        const dy = p.y - o.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.18;
          ctx.strokeStyle = `rgba(21, 128, 61, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  };

  resize();
  createParticles();
  draw();
  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}
