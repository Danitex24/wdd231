import { items } from "../data/discover.mjs";

// Shared header / footer behaviour
const menuBtn = document.querySelector("#menu");
const navEl = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {
  const isOpen = navEl.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Render the 8 discover cards
const gallery = document.querySelector("#discover-gallery");

function buildCard(item, index) {
  const card = document.createElement("article");
  card.classList.add("discover-card");
  card.style.gridArea = `card${index + 1}`;
  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button type="button" class="learn-more">Learn More</button>
  `;
  return card;
}

items.forEach((item, index) => gallery.appendChild(buildCard(item, index)));

// Visitor message via localStorage
const messageBox = document.querySelector("#visitor-message");
const STORAGE_KEY = "abujaChamberLastVisit";
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const now = Date.now();
const stored = localStorage.getItem(STORAGE_KEY);

let message;
if (!stored) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const lastVisit = Number(stored);
  const diffDays = Math.floor((now - lastVisit) / MS_PER_DAY);

  if (diffDays < 1) {
    message = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${diffDays} days ago.`;
  }
}

messageBox.querySelector(".message-text").textContent = message;
localStorage.setItem(STORAGE_KEY, String(now));

// Allow visitor to dismiss the message
messageBox.querySelector(".close-message").addEventListener("click", () => {
  messageBox.hidden = true;
});
