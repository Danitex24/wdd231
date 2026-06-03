const params = new URLSearchParams(window.location.search);
const result = document.querySelector("#form-result");
const savedSuggestion = JSON.parse(localStorage.getItem("lastSuggestion")) || {};

const name = params.get("tool-name") || savedSuggestion.name || "Not provided";
const category = params.get("category") || savedSuggestion.category || "Not provided";
const reason = params.get("reason") || savedSuggestion.reason || "Not provided";

result.innerHTML = `
  <h2>Submitted Tool Information</h2>
  <p><strong>Tool Name:</strong> ${name}</p>
  <p><strong>Category:</strong> ${category}</p>
  <p><strong>Reason:</strong> ${reason}</p>
`;