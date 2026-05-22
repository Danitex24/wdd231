const LEVEL_LABELS = {
  1: { label: "Member", className: "member" },
  2: { label: "Silver", className: "silver" },
  3: { label: "Gold", className: "gold" }
};

const directoryEl = document.querySelector("#directory");
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

async function getMembers() {
  const response = await fetch("data/members.json");
  if (!response.ok) {
    throw new Error(`Failed to load members.json (${response.status})`);
  }
  const data = await response.json();
  return data.members;
}

function buildMemberCard(member) {
  const levelInfo = LEVEL_LABELS[member.level] || { label: "Member", className: "member" };

  const card = document.createElement("article");
  card.classList.add("member-card");

  const cleanWebsite = member.website.replace(/^https?:\/\//, "");

  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="300" height="200">
    <h2>${member.name}</h2>
    <span class="industry">${member.industry}</span>
    <span class="level ${levelInfo.className}">${levelInfo.label}</span>
    <p class="description">${member.description}</p>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/\s+/g, "")}">${member.phone}</a></p>
    <p><strong>Founded:</strong> ${member.founded}</p>
    <a class="site" href="${member.website}" target="_blank" rel="noopener">Visit ${cleanWebsite}</a>
  `;

  return card;
}

function renderMembers(members) {
  directoryEl.innerHTML = "";
  members.forEach((member) => directoryEl.appendChild(buildMemberCard(member)));
}

function setView(mode) {
  if (mode === "list") {
    directoryEl.classList.add("list");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
    listBtn.setAttribute("aria-pressed", "true");
    gridBtn.setAttribute("aria-pressed", "false");
  } else {
    directoryEl.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
  }
}

async function init() {
  try {
    const members = await getMembers();
    renderMembers(members);
  } catch (error) {
    directoryEl.innerHTML = `<p>Sorry, we couldn't load the member directory right now. Please try again later.</p>`;
    console.error(error);
  }
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

const menuBtn = document.querySelector("#menu");
const navEl = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {
  const isOpen = navEl.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

init();
