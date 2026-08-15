const weatherCodes = {
  0: { desc: "Clear sky", icon: "☀️" },
  1: { desc: "Mainly clear", icon: "🌤️" },
  2: { desc: "Partly cloudy", icon: "⛅" },
  3: { desc: "Overcast", icon: "☁️" },
  45: { desc: "Fog", icon: "🌫️" },
  48: { desc: "Depositing rime fog", icon: "🌫️" },
  51: { desc: "Light drizzle", icon: "🌦️" },
  53: { desc: "Moderate drizzle", icon: "🌦️" },
  55: { desc: "Dense drizzle", icon: "🌧️" },
  56: { desc: "Light freezing drizzle", icon: "🌧️❄️" },
  57: { desc: "Dense freezing drizzle", icon: "🌧️❄️" },
  61: { desc: "Slight rain", icon: "🌦️" },
  63: { desc: "Moderate rain", icon: "🌧️" },
  65: { desc: "Heavy rain", icon: "🌧️" },
  66: { desc: "Light freezing rain", icon: "🌧️❄️" },
  67: { desc: "Heavy freezing rain", icon: "🌧️❄️" },
  71: { desc: "Slight snow fall", icon: "🌨️" },
  73: { desc: "Moderate snow fall", icon: "🌨️" },
  75: { desc: "Heavy snow fall", icon: "❄️" },
  77: { desc: "Snow grains", icon: "❄️" },
  80: { desc: "Slight rain showers", icon: "🌦️" },
  81: { desc: "Moderate rain showers", icon: "🌧️" },
  82: { desc: "Violent rain showers", icon: "⛈️" },
  85: { desc: "Slight snow showers", icon: "🌨️" },
  86: { desc: "Heavy snow showers", icon: "🌨️" },
  95: { desc: "Thunderstorm: slight or moderate", icon: "⛈️" },
  96: { desc: "Thunderstorm with slight hail", icon: "⛈️🧊" },
  99: { desc: "Thunderstorm with heavy hail", icon: "⛈️🧊" },
};

const locationForm = document.getElementById("search-form");
const locationButton = document.getElementById("current-location");
const locationInput = document.getElementById("text-location");
const resultContainer = document.getElementById("result-container");
const loadContainer = document.getElementById("load-container");
const errorContainer = document.getElementById("error-container");
const stateContainers = [loadContainer, resultContainer, errorContainer];

const getForecast = async (lat, lon, cityName) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    const { temperature, weathercode } = data.current_weather;
    const tempUnit = data.current_weather_units.temperature;

    const info = weatherCodes[weathercode] ?? {
      desc: "Desconocido",
      icon: "❓",
    };
    const weatherData = {
      city: cityName,
      temperature: `${temperature} ${tempUnit}`,
      description: info.desc,
      icon: info.icon,
    };

    console.log(weatherData);
    renderResult(weatherData);
  } catch (error) {
    console.error(`Fetch failed: ${error.message}`);
    renderError(error.message);
  }
};

const showContainer = (toShow) => {
  stateContainers.forEach((e) => {
    e.classList.add("hidden-container");
  });

  toShow.classList.remove("hidden-container");
};

const renderResult = (weatherData) => {
  resultContainer.innerHTML = "";
  resultContainer.innerHTML = `
  <div>
  <h2>${weatherData.city}</h2>
  <span class="icon">${weatherData.icon}</span>
  </div>
  <p class="temperature">${weatherData.temperature} </p>
  <p>${weatherData.description}</p>
  `;
  showContainer(resultContainer);
  locationInput.value = "";
};

const renderError = (errorMessage) => {
  errorContainer.innerHTML = "";
  errorContainer.innerHTML = `
  <h2>Error!</h2>
  <p>${errorMessage}</p>
  `;
  showContainer(errorContainer);
};

locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    showContainer(loadContainer);
    const locationValue = encodeURIComponent(locationInput.value.trim());
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${locationValue}&count=5&language=es`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("Error no data provided");
    }

    const locationCity = data.results[0];

    console.log(`Success: ${locationCity}`);
    console.log(
      `latitude: ${locationCity.latitude} / longitude: ${locationCity.longitude}`,
    );
    getForecast(
      locationCity.latitude,
      locationCity.longitude,
      locationCity.name,
    );
    return data.results;
  } catch (error) {
    console.error(`Fetch failed: ${error.message}`);
    renderError(error.message);
  }
});

locationButton.addEventListener("click", () => {
  locationInput.value = "";
  showContainer(loadContainer);
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      getForecast(latitude, longitude, "Ubicación Actual");
    },
    (error) => {
      console.error(error.message);
      renderError(error.message);
    },
  );
});
