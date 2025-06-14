document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "54063042ff90f456170f24ae886c24f4";

  if (!city) {
    document.getElementById("weatherResult").innerHTML = "⚠️ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
      const country = data.sys.country;
      const icon = data.weather[0].icon;

      const weather = `
        <h2>${data.name}, ${country} <img src="https://flagcdn.com/24x18/${country.toLowerCase()}.png"></h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
        <p>🌡️ Temp: ${data.main.temp}°C</p>
        <p>🌥️ ${data.weather[0].main}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind: ${data.wind.speed} m/s</p>
        <p>🌅 Sunrise: ${sunrise}</p>
        <p>🌇 Sunset: ${sunset}</p>
      `;
      document.getElementById("weatherResult").innerHTML = weather;
    })
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = "❌ Error: " + error.message;
    });
}
