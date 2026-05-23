const menuButton = document.getElementById("menu");
const primaryNav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});
