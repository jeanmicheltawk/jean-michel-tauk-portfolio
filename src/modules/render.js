const stackIcons = {
  Frontend: "◈",
  "State Management": "◎",
  Backend: "◍",
  Tools: "◇",
  "Testing & Delivery": "✦",
};

export function createStackGrid(groups) {
  const root = document.getElementById("stackGrid");
  if (!root) return;

  root.innerHTML = groups
    .map(
      (group, index) => `
      <article class="stack-card reveal reveal-delay-${index % 3}" style="--i:${index}">
        <header>
          <span class="stack-icon">${stackIcons[group.title] || "◉"}</span>
          <h3>${group.title}</h3>
        </header>
        <ul>
          ${group.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    `
    )
    .join("");
}

export function createTimeline(items) {
  const root = document.getElementById("timeline");
  if (!root) return;

  root.innerHTML = items
    .map(
      (item, index) => `
      <article class="timeline-item reveal reveal-delay-${index % 3}" style="--i:${index}">
        <button class="timeline-head" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <span class="timeline-dot"></span>
          <div>
            <h3>${item.company}</h3>
            <p>${item.role}</p>
          </div>
          <time>${item.duration}</time>
        </button>
        <div class="timeline-body ${index === 0 ? "is-open" : ""}">
          <ul>
            ${item.achievements.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </div>
      </article>
    `
    )
    .join("");

  root.querySelectorAll(".timeline-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body = btn.nextElementSibling;
      const isOpen = body.classList.contains("is-open");
      body.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

export function createProjectsGrid(projects) {
  const root = document.getElementById("projectsGrid");
  if (!root) return;

  root.innerHTML = projects
    .map(
      (project, index) => `
      <article class="project-card glass-card reveal reveal-delay-${index % 3} ${index === 0 ? "project-featured" : ""}" style="--i:${index}">
        <div class="project-meta-top">
          <span class="project-category">${project.category || "Project"}</span>
          <span class="project-period">${project.period || ""}</span>
        </div>
        <h3>${project.name}</h3>
        <p class="project-client">${project.client || ""}</p>
        <p>${project.description}</p>
        <div class="project-impact">${project.impact || ""}</div>
        ${project.website ? `<a class="project-site-link" href="${project.website}" target="_blank" rel="noopener noreferrer">${project.website.replace(/^https?:\/\//, "")}</a>` : ""}
        <div class="project-visual" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
        <div class="project-tags">
          ${project.stack.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <button class="btn btn-tertiary open-project-modal" data-project-index="${index}">
          View Case Study
        </button>
      </article>
    `
    )
    .join("");
}
