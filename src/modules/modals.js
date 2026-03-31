export function initModals(projects) {
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalWebsite = document.getElementById("modalWebsite");
  const modalDescription = document.getElementById("modalDescription");
  const modalTags = document.getElementById("modalTags");
  const modalHighlights = document.getElementById("modalHighlights");
  const closeBtn = document.getElementById("modalClose");

  if (
    !modal ||
    !modalTitle ||
    !modalMeta ||
    !modalWebsite ||
    !modalDescription ||
    !modalTags ||
    !modalHighlights ||
    !closeBtn
  )
    return;

  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const open = (project) => {
    modalTitle.textContent = project.name;
    modalMeta.textContent = [project.client, project.period, project.category].filter(Boolean).join(" • ");
    modalWebsite.innerHTML = project.website
      ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer">${project.website}</a>`
      : "";
    modalDescription.textContent = project.description;
    modalTags.innerHTML = (project.stack || []).map((item) => `<span>${item}</span>`).join("");
    modalHighlights.innerHTML = project.details.map((item) => `<li>${item}</li>`).join("");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".open-project-modal");
    if (!btn) return;
    const index = Number(btn.dataset.projectIndex || -1);
    const selected = projects[index];
    if (selected) open(selected);
  });

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.closeModal) close();
  });
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}
