// Shared header / footer behavior (mirrors the rest of the chamber site)

const menuBtn = document.querySelector("#menu");
const navEl = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {
  const isOpen = navEl.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Stamp the hidden timestamp the moment the form is loaded
document.querySelector("#timestamp").value = new Date().toISOString();

// Membership level modals
const modalTriggers = document.querySelectorAll(".level-link");

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.getElementById(trigger.dataset.modal);
    if (modal && typeof modal.showModal === "function") {
      modal.showModal();
    }
  });
});

document.querySelectorAll(".level-modal .close-modal").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});

// Click on the backdrop (outside the dialog body) to close
document.querySelectorAll(".level-modal").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
