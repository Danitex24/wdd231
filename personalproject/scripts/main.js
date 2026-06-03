const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("nav");
const year = document.querySelector("#year");
const modified = document.querySelector("#last-modified");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (modified) {
  modified.textContent = document.lastModified;
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
  });
}