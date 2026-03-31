export function initCursorGlow() {
  const cursor = document.getElementById("cursorGlow");
  if (!cursor) return;

  const isTouch =
    window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    cursor.style.display = "none";
    return;
  }

  let x = window.innerWidth * 0.5;
  let y = window.innerHeight * 0.5;
  let tx = x;
  let ty = y;

  window.addEventListener(
    "mousemove",
    (event) => {
      tx = event.clientX;
      ty = event.clientY;
    },
    { passive: true }
  );

  const follow = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(follow);
  };

  requestAnimationFrame(follow);
}
