// from https://home.openweathermap.org/api_keys
const OPENWEATHER_API_KEY = "22c48fef7c33b509e395f4d6112677e3";

// Abuja, Nigeria coordinates
const ABUJA_LAT = 9.0765;
const ABUJA_LON = 7.3986;

const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${ABUJA_LAT}&lon=${ABUJA_LON}&units=imperial&appid=${OPENWEATHER_API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${ABUJA_LAT}&lon=${ABUJA_LON}&units=imperial&appid=${OPENWEATHER_API_KEY}`;

const LEVEL_LABELS = {
  1: { label: "Member", className: "member" },
  2: { label: "Silver", className: "silver" },
  3: { label: "Gold", className: "gold" }
};

// Shared header / footer logic

const menuBtn = document.querySelector("#menu");
const navEl = document.querySelector("#nav");

menuBtn.addEventListener("click", () => {
  const isOpen = navEl.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Weather

const currentWeatherEl = document.querySelector("#current-weather");
const forecastEl = document.querySelector("#forecast");

function capitalize(text) {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

function renderCurrentWeather(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const description = capitalize(data.weather[0].description);
  const temp = Math.round(data.main.temp);
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);
  const humidity = data.main.humidity;

  currentWeatherEl.innerHTML = `
    <img src="${iconUrl}" alt="${description}" width="80" height="80">
    <div class="current-weather-body">
      <p class="temp">${temp}&deg;F</p>
      <p class="desc">${description}</p>
      <p class="high-low">High: ${high}&deg; &middot; Low: ${low}&deg;</p>
      <p class="humidity">Humidity: ${humidity}%</p>
    </div>
  `;
}

function pickDailyForecast(list) {
  // Let me group by date, pick the entry closest to 12:00 (midday) for each day,
  // skip today, then take the next three days.
  const todayKey = new Date().toISOString().slice(0, 10);
  const byDate = new Map();

  list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const key = date.toISOString().slice(0, 10);
    if (key === todayKey) return;

    const hour = date.getHours();
    const distanceFromNoon = Math.abs(12 - hour);

    const existing = byDate.get(key);
    if (!existing || distanceFromNoon < existing.distance) {
      byDate.set(key, { entry, distance: distanceFromNoon });
    }
  });

  return Array.from(byDate.values()).slice(0, 3).map((item) => item.entry);
}

function renderForecast(data) {
  const days = pickDailyForecast(data.list);
  if (days.length === 0) {
    forecastEl.innerHTML = `<p>No forecast available right now.</p>`;
    return;
  }

  forecastEl.innerHTML = days
    .map((entry) => {
      const date = new Date(entry.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(entry.main.temp);
      const iconCode = entry.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      const desc = entry.weather[0].main;
      return `
        <div class="forecast-day">
          <p class="forecast-name">${dayName}</p>
          <img src="${iconUrl}" alt="${desc}" width="50" height="50">
          <p class="forecast-temp">${temp}&deg;F</p>
        </div>
      `;
    })
    .join("");
}

async function loadWeather() {
  if (OPENWEATHER_API_KEY === "22c48fef7c33b509e395f4d6112677e3") {
    currentWeatherEl.innerHTML = `<p class="weather-error">Loading live weather...</p>`;
    forecastEl.innerHTML = "";
    return;
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(CURRENT_URL),
      fetch(FORECAST_URL)
    ]);

    if (!currentRes.ok) throw new Error(`Current weather request failed (${currentRes.status})`);
    if (!forecastRes.ok) throw new Error(`Forecast request failed (${forecastRes.status})`);

    const [currentData, forecastData] = await Promise.all([
      currentRes.json(),
      forecastRes.json()
    ]);

    renderCurrentWeather(currentData);
    renderForecast(forecastData);
  } catch (error) {
    console.error(error);
    currentWeatherEl.innerHTML = `<p class="weather-error">Sorry, weather data couldn't be loaded.</p>`;
    forecastEl.innerHTML = "";
  }
}

//Spotlights 

const spotlightsEl = document.querySelector("#spotlights");

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildSpotlight(member) {
  const levelInfo = LEVEL_LABELS[member.level] || LEVEL_LABELS[1];
  const cleanWebsite = member.website.replace(/^https?:\/\//, "");
  const card = document.createElement("article");
  card.classList.add("spotlight-card");
  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="600" height="400">
    <div class="spotlight-body">
      <h3>${member.name}</h3>
      <span class="level ${levelInfo.className}">${levelInfo.label}</span>
      <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/\s+/g, "")}">${member.phone}</a></p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit ${cleanWebsite}</a></p>
    </div>
  `;
  return card;
}

async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error(`Failed to load members.json (${response.status})`);

    const data = await response.json();
    const eligible = data.members.filter((m) => m.level === 2 || m.level === 3);

    const count = Math.min(3, eligible.length);
    const picks = shuffle(eligible).slice(0, count);

    spotlightsEl.innerHTML = "";
    picks.forEach((member) => spotlightsEl.appendChild(buildSpotlight(member)));
  } catch (error) {
    console.error(error);
    spotlightsEl.innerHTML = `<p>Sorry, member spotlights couldn't be loaded.</p>`;
  }
}

loadWeather();
loadSpotlights();
