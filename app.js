// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
  key: "a0d9d474614036d41900134d976b4ad2",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");
const arrow_key = document.querySelector(".header i");
const locationBtn = document.querySelector(".geo");

arrow_key.addEventListener("click", () => {
  document.querySelector(".weather-body").style.display = "none";
  arrow_key.style.display = "none";
  searchInputBox.value = "";
  document.querySelector(".geo-location").style.display = "block";
  document.getElementById("seperator").style.display = "block";
  document.body.style.backgroundImage = "url('images/sunny1.jpg')";
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  document.getElementById("city").textContent = "";
  document.getElementById("date").textContent = "";
  document.getElementById("temp").textContent = "";
  document.getElementById("min-max").textContent = "";
  document.getElementById("weather").textContent = "";
  document.querySelector(".weather-body").style.display = "block";
  document.querySelector(".geo-location").style.display = "none";
  document.getElementById("seperator").style.display = "none";
  getWeatherReportByGeo(latitude, longitude);
}

function onError(error) {
  alert(`${error.message}`);
}

function getWeatherReportByGeo(latitude, longitude) {
  fetch(
    `${weatherApi.baseUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApi.key}&units=metric`
  )
    .then((weatherGeo) => {
      return weatherGeo.json();
    })
    .then(showWeatherReportByGeo);
}

// Event Listener Function on keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    // console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
    document.querySelector(".geo-location").style.display = "none";
    document.getElementById("seperator").style.display = "none";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

// Show Weather Report
function showWeatherReportByGeo(weatherGeo) {
  // console.log(weatherGeo);
  document.getElementById("city").textContent = "";
  document.getElementById("date").textContent = "";
  document.getElementById("temp").textContent = "";
  document.getElementById("min-max").textContent = "";
  document.getElementById("weather").textContent = "";
  document.getElementById("font").style.display = "none";
  document.querySelector(".header i").style.display = "inline-block";
  document.querySelector(".other-info-sep").style.display = "block";
  document.querySelector(".other-info").style.display = "flex";
  document.querySelector(".other-info-value").style.display = "flex";

  let city = document.getElementById("city");
  city.innerText = `${weatherGeo.name}, ${weatherGeo.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weatherGeo.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weatherGeo.main.temp_min
  )}&deg;C (min) / ${Math.ceil(weatherGeo.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weatherGeo.weather[0].main}`;

  let humityValue = document.querySelector(".other-info-value .humity-value");
  let windSpeed = document.querySelector(".other-info-value .speed-value");
  humityValue.innerHTML = `${weatherGeo.main.humidity} %`;
  windSpeed.innerHTML = `${weatherGeo.wind.speed} m/sec`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);
  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/cloud-2.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rain-2.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  } else if (weatherType.textContent == "Mist") {
    document.body.style.backgroundImage = "url('images/mist.jpg')";
  } else if (weatherType.textContent == "Smoke") {
    document.body.style.backgroundImage = "url('images/smoke.jpg')";
  }
}
function showWeatherReport(weather) {
  // console.log(weather);
  if (weather.cod === "404") {
    document.getElementById("city").textContent = "";
    document.getElementById("date").textContent = "";
    document.getElementById("temp").textContent = "";
    document.getElementById("min-max").textContent = "";
    document.getElementById("weather").textContent = "";
    document.querySelector(".other-info-sep").style.display = "none";
    document.querySelector(".other-info").style.display = "none";
    document.querySelector(".other-info-value").style.display = "none";
    document.querySelector(".header i").style.display = "inline-block";
    document.getElementById("font").style.display = "block";
    document.getElementById("font").textContent = "City Not Found";
  } else if (weather.cod === "400") {
    document.getElementById("city").textContent = "";
    document.getElementById("date").textContent = "";
    document.getElementById("temp").textContent = "";
    document.getElementById("min-max").textContent = "";
    document.getElementById("weather").textContent = "";
    document.querySelector(".other-info-sep").style.display = "none";
    document.querySelector(".other-info").style.display = "none";
    document.querySelector(".other-info-value").style.display = "none";
    document.querySelector(".header i").style.display = "inline-block";
    document.getElementById("font").style.display = "block";
    document.getElementById("font").textContent = "Enter a City";
  } else {
    document.getElementById("city").textContent = "";
    document.getElementById("date").textContent = "";
    document.getElementById("temp").textContent = "";
    document.getElementById("min-max").textContent = "";
    document.getElementById("weather").textContent = "";
    document.getElementById("font").style.display = "none";
    document.querySelector(".header i").style.display = "inline-block";
    document.querySelector(".other-info-sep").style.display = "block";
    document.querySelector(".other-info").style.display = "flex";
    document.querySelector(".other-info-value").style.display = "flex";

    let city = document.getElementById("city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById("temp");
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById("min-max");
    minMaxTemp.innerHTML = `${Math.floor(
      weather.main.temp_min
    )}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById("weather");
    weatherType.innerText = `${weather.weather[0].main}`;

    let humityValue = document.querySelector(".other-info-value .humity-value");
    let windSpeed = document.querySelector(".other-info-value .speed-value");
    humityValue.innerHTML = `${weather.main.humidity} %`;
    windSpeed.innerHTML = `${weather.wind.speed} m/sec`;

    let date = document.getElementById("date");
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    if (weatherType.textContent == "Clear") {
      document.body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (weatherType.textContent == "Clouds") {
      document.body.style.backgroundImage = "url('images/cloud.jpg')";
    } else if (weatherType.textContent == "Haze") {
      document.body.style.backgroundImage = "url('images/cloud-2.jpg')";
    } else if (weatherType.textContent == "Rain") {
      document.body.style.backgroundImage = "url('images/rain-2.jpg')";
    } else if (weatherType.textContent == "Snow") {
      document.body.style.backgroundImage = "url('images/snow.jpg')";
    } else if (weatherType.textContent == "Thunderstorm") {
      document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    } else if (weatherType.textContent == "Mist") {
      document.body.style.backgroundImage = "url('images/mist.jpg')";
    } else if (weatherType.textContent == "Smoke") {
      document.body.style.backgroundImage = "url('images/smoke.jpg')";
    }
  }
}

// Date manage
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
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

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
