import { experiences, projects, stackGroups, typingPhrases } from "./data/content.js";
import { initTyping } from "./modules/typing.js";
import { initNavbar } from "./modules/navbar.js";
import { initScrollProgress } from "./modules/progress.js";
import { initParallax } from "./modules/parallax.js";
import { initReveal } from "./modules/reveal.js";
import { initCounters } from "./modules/counters.js";
import { initMouseTilt } from "./modules/tilt.js";
import { initModals } from "./modules/modals.js";
import { initSmoothScroll } from "./modules/smoothScroll.js";
import { initMotionPlus } from "./modules/motionPlus.js";
import { createStackGrid, createTimeline, createProjectsGrid } from "./modules/render.js";
import { lazyLoadSections, lazyLoadEffects } from "./modules/lazy.js";

document.documentElement.classList.add("js");

const init = () => {
  createStackGrid(stackGroups);
  createTimeline(experiences);
  createProjectsGrid(projects);

  initTyping({
    element: document.getElementById("typingText"),
    phrases: typingPhrases,
  });

  initNavbar();
  initScrollProgress();
  initParallax();
  initReveal();
  initSmoothScroll();
  initCounters();
  initMouseTilt();
  initModals(projects);
  initMotionPlus();

  lazyLoadSections();
  lazyLoadEffects();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
