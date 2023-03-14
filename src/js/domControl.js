import { fetchAPI } from "./weather.js";
import { controlChart } from "./chart.js";
import { controlSwiper } from "./swiper.js";

const btnSearch = document.querySelector("#btn-search");

const handleClick = async (event) => {
  const city = document.querySelector("#search").value;
  const data = await fetchAPI(city);
  const date = new Date(await data.current.date);
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

      switch (date.getDay()) {
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
        case 7:
          day = "Domingo";
          break;
        default:
            day = "Hoje";
      }

      return day;
  }

  iconElement.src = data.current.icon;
  dateElement.textContent = `${getDayForecast(date).slice(0,3)}, ${date.getDay()}`;
  tempElement.textContent = `${data.current.temp}°C`;
  locationElement.textContent = `${data.current.location.name}, ${data.current.location.region}`
  tempMaxElement.textContent = `${Math.trunc(data.current.tempMax)}°C`;
  sunsetElement.textContent = `${data.current.sunset}`;
  controlChart(data.current);
//   FINAL HEADER

// INIT MAIN
 const forecastdayElement = data.forecastday.reduce((html, forecastday) => {
  console.log(forecastday);
    return html += `<li class="main-forecast-data-item">
    <span class="main-forecast-data-item-dayweek">${forecastday.day}</span>
    <div class="main-forecast-data-item-chain-of-rain">
      <i class="fa-solid fa-droplet"></i>
      
      <span>54%</span>
    </div>
    
    <div class="main-forecast-data-item-icon-situation-weather">
      <i class="fa-solid fa-sun"></i>
    </div>

    <div class="main-forecast-data-item-chart-dayweek">
      <span id="temp-min">22°C</span> <!-- min-->
      <div class="main-forecast-data-item-chart-temp">
        <div class="main-forecast-data-item-chart">
          <span class="main-forcast-data-item-chart-progress"></span>
        </div>
        <!-- DESCOBRIR COMO FAZ O GRÁFICO PARA OS DOIS LADOS || ------|=====---- || -->
      </div>
      <span id="temp-max">40°C</span><!-- max-->
    </div>
  </li>`
})
console.log(forecastdayElement)

// document.querySelector(".main-forecast-data-container").appendChild(forecastdayElement)
};

controlSwiper();
btnSearch.addEventListener("click", handleClick);
