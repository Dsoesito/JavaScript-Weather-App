const api = {
  key: "874655141695e4442b46c8613926581d",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
const localWeatherBtn = document.querySelector(".local-weather");

searchBox.addEventListener("keypress", setQuery);
localWeatherBtn.addEventListener("click", localWeather);

function localWeather() {
  navigator.geolocation.getCurrentPosition(success, error);
  searchBox.value = "";
}

function success(pos) {
  var location = pos.coords;

  fetch(
    `${api.base}weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${api.key}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function error(err) {
  alert(`${err.message}`);
}

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerText = weather.weather[0].main;

  let locationIcon = document.querySelector(".current .weather-icon");
  const { icon } = weather.weather[0];
  locationIcon.innerHTML = `<img src="icons/${icon}.png" />`;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
  searchBox.value = "";
}

function dateBuilder(d) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "thurs", "Fri", "Sat"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
