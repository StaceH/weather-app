// Date
let now = new Date();
let today = document.querySelector(".todaysDate");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

today.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

// Current Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let todaysTemp = document.querySelector("#todaysStats");
  let h1 = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  todaysTemp.innerHTML = `${temperature}`;
  h1.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

// Current Location
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "db7d2e78c779a2432fadef0082ebe3e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);

let form = document.querySelector("#city");

form.addEventListener("submit", search);

// Conversion  **********
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todaysStats");
  temperatureElement.innerHTML = 93;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todaysStats");
  temperatureElement.innerHTML = 34;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// search function
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;

    searchCity(searchInput.value);
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "db7d2e78c779a2432fadef0082ebe3e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

searchCity("Barcelona");
