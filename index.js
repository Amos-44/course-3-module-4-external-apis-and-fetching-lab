// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

// FETCH WEATHER ALERTS
function fetchWeatherAlerts(state) {

  if (!state) {
    displayError("Please enter a state abbreviation");
    return;
  }

  return fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(res => res.json())
    .then(data => {

      if (!data.features || data.features.length === 0) {
        throw new Error("No alerts found for this state");
      }

      displayWeather(data);
      clearError();

    })
    .catch(err => {
      displayError(err.message);
    });
}

// DISPLAY WEATHER
function displayWeather(data) {

  displayDiv.innerHTML = "";

  const count = data.features.length;

  const title = document.createElement("h3");
  title.textContent = `Weather Alerts: ${count}`;

  displayDiv.appendChild(title);

  data.features.forEach(item => {
    const p = document.createElement("p");
    p.textContent = item.properties.headline;
    displayDiv.appendChild(p);
  });
}

// ERROR SHOW
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}

// ERROR CLEAR
function clearError() {
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}

// BUTTON CLICK 
button.addEventListener("click", () => {

  const state = input.value.trim().toUpperCase();

  input.value = ""; 

  fetchWeatherAlerts(state);
});

// EXPORT FOR TESTS
module.exports = {
  fetchWeatherAlerts,
  displayWeather,
  displayError
};