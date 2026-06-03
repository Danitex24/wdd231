export async function getTools() {
  const response = await fetch("./data/tools.json");

  if (!response.ok) {
    throw new Error("Unable to fetch tools data.");
  }

  return await response.json();
}