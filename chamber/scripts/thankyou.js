// Shared header / footer behavior

const menuBtn = document.querySelector("#menu");
const navEl = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {
  const isOpen = navEl.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Render the submitted application data from the URL query string
const summaryEl = document.querySelector("#application-summary");
const params = new URLSearchParams(window.location.search);

const fields = [
  { key: "first-name", label: "First Name" },
  { key: "last-name", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "mobile", label: "Mobile Phone" },
  { key: "organization", label: "Business / Organization" },
  { key: "timestamp", label: "Submitted On" },
];

function formatTimestamp(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

if (!params.has("first-name")) {
  summaryEl.innerHTML = `<p>No application data was submitted. <a href="join.html">Return to the application form</a>.</p>`;
} else {
  summaryEl.innerHTML = "";
  const list = document.createElement("dl");
  fields.forEach(({ key, label }) => {
    const raw = params.get(key) || "—";
    const value = key === "timestamp" ? formatTimestamp(raw) : raw;

    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;

    list.appendChild(dt);
    list.appendChild(dd);
  });
  summaryEl.appendChild(list);
}
