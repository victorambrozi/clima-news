import { fetchAPI } from "./fetchWeather.js";
import { controlChart } from "./chart.js";
import { controlSwiper } from "./swiper.js";
import { fetchAPICities } from "./fetchWeather.js";

const btnSearch = document.querySelector("#btn-search");

const handleClick = async (event) => {
  const city = document.querySelector("#search").value;
  const data = await fetchAPI(city);
  const daywWeek = new Date(await data.current.date).getUTCDate();
  const dayDate = new Date(await data.current.date);
  event.preventDefault();

  // ambiente
  const iconElement = document.querySelector('[data-forecast-current="icon"]');
  const dateElement = document.querySelector('[data-forecast-current="date"]');
  const tempElement = document.querySelector('[data-forecast-current="temp"]');
  const tempMaxElement = document.querySelector(
    '[data-forecast-current="temp-max"]'
  );
  const locationElement = document.querySelector(
    '[data-forecast-current="location"]'
  );
  const sunsetElement = document.querySelector(
    '[data-forecast-current="sunset"]'
  );

  const getDayForecast = (date) => {
    let day = '';

    switch (date.getUTCDay()) {
      case 0:
        day = "Domingo";
        break;
      case 1:
        day = "Segunda";
        break;
      case 2:
        day = "Terça";
        break;
      case 3:
        day = "Quarta";
        break;
      case 4:
        day = "Quinta";
        break;
      case 5:
        day = "Sexta";
        break;
      case 6:
        day = "Sábado";
        break;
    }
    return day;
  }

  iconElement.src = data.current.icon;
  dateElement.textContent = `${getDayForecast(dayDate).slice(0, 3)}, ${daywWeek}`;
  tempElement.textContent = `${data.current.temp}°C`;
  locationElement.textContent = `${data.current.location.name}`
  tempMaxElement.textContent = `${Math.trunc(data.current.tempMax)}°C`;
  sunsetElement.textContent = `${data.current.sunset}`;
  controlChart(data.current);
  //   FINAL HEADER

  // INIT MAIN
  const forecastdayContainer = document.querySelector('[data-forecastday="container"]');
  const dataFoercastday = await data.forecastday.reduce((html, forecastday) => {

    const day = new Date(forecastday.date);
    const chaceOfRain = forecastday.day.daily_chance_of_rain;
    const iconForecastday = forecastday.day.condition.icon;
    const altIconForecastday = forecastday.day.condition.text;
    const tempMin = forecastday.day.mintemp_c;
    const tempMax = forecastday.day.maxtemp_c;


    return html += ` 
    <li class="main-forecast-data-item">
      <span class="main-forecast-data-item-dayweek">${getDayForecast(day)}</span>
      <div class="main-forecast-data-item-chain-of-rain">
        <i class="fa-solid fa-droplet"></i>
        <span>${chaceOfRain}%</span>
      </div>
  
      <div class="main-forecast-data-item-icon-situation-weather">
          <img src="${iconForecastday}" alt="${altIconForecastday}">
      </div>

      <div class="main-forecast-data-item-chart-dayweek">
        <span id="temp-min">${Math.trunc(tempMin)}°C</span>
        <div class="main-forecast-data-item-chart-temp">
          <div class="main-forecast-data-item-chart">
            <span class="main-forcast-data-item-chart-progress" style="width: ${forecastday.day.avgtemp_c}%"></span>
          </div>
        </div>
        <span id="temp-max">${Math.trunc(tempMax)}°C</span>
      </div>
    </li>`;
  }, '');
  forecastdayContainer.outerHTML = dataFoercastday;
};

const handleLoad = async () => {
  const dataCities = await fetchAPICities();
  const iconCard = dataCities.map(data => data.current.condition.icon)
  const citiesName = dataCities.map(data => data.location.name);
  const citiesTemp = dataCities.map(data => data.current.temp_c);

  citiesName.forEach((city, index) => {
    const cardTitle = document.querySelectorAll('[data-card="title"]');
    cardTitle[index].textContent = city;
  })

  iconCard.forEach((icon, index) => {
    const iconElement = document.querySelectorAll('[data-card="icon"]');
   iconElement[index].src = icon; 
  })

  citiesTemp.forEach((temp, index) => {
    const tempCity = document.querySelectorAll('[data-card="temp"]');
    tempCity[index].textContent = `${Math.trunc(temp)}°C`; 
  })

  await controlSwiper();
}

btnSearch.addEventListener("click", handleClick);
window.addEventListener("load", handleLoad);
