const apiKey = "YOUR_API_KEY";
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) => console.log("Service Worker Registration Failed", error));
}
// Fetch weather using city input
async function getWeatherByCity() {
  let city = document.getElementById("city").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Fetch weather using GPS
function getWeatherByGPS() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetchWeather(url);
      },
      (error) => {
        document.getElementById("weather").innerText =
          "Location access denied!";
      }
    );
  } else {
    document.getElementById("weather").innerText = "Geolocation not supported.";
  }
}

// Fetch and display weather
async function fetchWeather(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById(
      "weather"
    ).innerText = `Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
  } catch (error) {
    document.getElementById("weather").innerText = "Weather data unavailable!";
  }
}
