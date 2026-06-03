import { getTools } from "./tools-data.js";

const toolsContainer = document.querySelector("#tools-container");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const modal = document.querySelector("#tool-modal");
const modalBody = document.querySelector("#modal-body");
const closeModal = document.querySelector("#close-modal");

let allTools = [];
const favorites = JSON.parse(localStorage.getItem("favoriteTools")) || [];

function saveFavorites() {
  localStorage.setItem("favoriteTools", JSON.stringify(favorites));
}

function isFavorite(toolName) {
  return favorites.includes(toolName);
}

function toggleFavorite(toolName) {
  const index = favorites.indexOf(toolName);

  if (index === -1) {
    favorites.push(toolName);
  } else {
    favorites.splice(index, 1);
  }

  saveFavorites();
  displayTools(filterTools());
}

function createCategoryOptions(tools) {
  const categories = [...new Set(tools.map((tool) => tool.category))].sort();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function filterTools() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  return allTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function openToolModal(tool) {
  modalBody.innerHTML = `
    <h2>${tool.name}</h2>
    <p><strong>Category:</strong> ${tool.category}</p>
    <p><strong>Description:</strong> ${tool.description}</p>
    <p><strong>Pricing:</strong> ${tool.pricing}</p>
    <p><strong>Best For:</strong> ${tool.bestFor}</p>
    <p><strong>Rating:</strong> ${tool.rating}/5</p>
    <p><a href="${tool.website}" target="_blank" rel="noopener">Visit Website</a></p>
  `;

  modal.showModal();
}

function displayTools(tools) {
  toolsContainer.innerHTML = "";

  if (tools.length === 0) {
    toolsContainer.innerHTML = "<p>No AI tools match your search.</p>";
    return;
  }

  tools.forEach((tool) => {
    const card = document.createElement("article");
    card.className = "tool-card";

    card.innerHTML = `
      <h3>${tool.name}</h3>
      <p class="meta">${tool.category} • ${tool.pricing}</p>
      <p>${tool.description}</p>
      <p><strong>Best For:</strong> ${tool.bestFor}</p>
      <p><strong>Rating:</strong> ${tool.rating}/5</p>
      <div class="actions">
        <button class="button details-button">Details</button>
        <button class="button secondary favorite-button">
          ${isFavorite(tool.name) ? "Remove Favorite" : "Save Favorite"}
        </button>
      </div>
    `;

    card.querySelector(".details-button").addEventListener("click", () => openToolModal(tool));
    card.querySelector(".favorite-button").addEventListener("click", () => toggleFavorite(tool.name));

    if (isFavorite(tool.name)) {
      card.classList.add("favorite");
    }

    toolsContainer.appendChild(card);
  });
}

async function init() {
  try {
    allTools = await getTools();
    createCategoryOptions(allTools);
    displayTools(allTools);
  } catch (error) {
    toolsContainer.innerHTML = `<p>Sorry, the AI tools could not be loaded. Please try again later.</p>`;
    console.error(error);
  }
}

searchInput.addEventListener("input", () => displayTools(filterTools()));
categorySelect.addEventListener("change", () => displayTools(filterTools()));

closeModal.addEventListener("click", () => {
  modal.close();
});

init();