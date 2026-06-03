const form = document.querySelector("#suggestion-form");

form.addEventListener("submit", (event) => {
  const name = document.querySelector("#tool-name").value.trim();
  const category = document.querySelector("#category").value.trim();
  const reason = document.querySelector("#reason").value.trim();

  const suggestion = {
    name,
    category,
    reason,
    submittedAt: new Date().toISOString()
  };

  localStorage.setItem("lastSuggestion", JSON.stringify(suggestion));
});