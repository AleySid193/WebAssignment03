const apiKey = '7adb99913d3796853e5f5cc995628a56';
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location');
const weatherInfo = document.getElementById('weather-info');

searchBtn.addEventListener('click', () => {
  const location = locationInput.value;
  if (!location) {
    alert('Please enter a location');
    return;
  }
  fetchWeatherData(location);
});

function fetchWeatherData(location) {
  const xhr = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        weatherInfo.innerHTML = '';
        displayWeatherInfo(data);
      } else {
        console.error('Error fetching weather data:', xhr.status);
        alert('Error fetching weather data!');
      }
    }
  };
  
  xhr.open('GET', url);
  xhr.send();
}

function displayWeatherInfo(data) {
  const city = data.name;
  const description = data.weather[0].description;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const minTemp = Math.round(data.main.temp_min);
  const maxTemp = Math.round(data.main.temp_max);
  const pressure = data.main.pressure;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const date = new Date().toLocaleDateString('en-US', { // Format date as "Day, Month Date, Year"
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const weatherContent = `
    <div class="weather-info-container">
      <h2>${city}</h2>
      <div class="weather-info-item"><span>Temperature:</span> ${temp}°C (Feels like: ${feelsLike}°C)</div>
      <div class="weather-info-item"><span>Description:</span> ${description}</div>
      <div class="weather-info-item"><span>Min Temperature:</span> ${minTemp}°C</div>
      <div class="weather-info-item"><span>Max Temperature:</span> ${maxTemp}°C</div>
      <div class="weather-info-item"><span>Pressure:</span> ${pressure} hPa</div>
      <div class="weather-info-item"><span>Humidity:</span> ${humidity}%</div>
      <div class="weather-info-item"><span>Wind Speed:</span> ${windSpeed} m/s</div>
      <div class="weather-info-item"><span>Sunrise:</span> ${sunrise}</div>
      <div class="weather-info-item"><span>Sunset:</span> ${sunset}</div>
    </div>
  `;

  weatherInfo.innerHTML = weatherContent;
}