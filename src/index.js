const API_KEY = "9f916719091d4adbb1c234509230703";

export const fetchAPI = async (city) => {
  const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no&lang=pt_br`;
  const response = await fetch(baseURL);
  const data = await response.json();

  const dataWeather = () => {
    const forecastdayOne = data.forecast.forecastday[0];
    const getForecastData = callback => data.forecast.forecastday.map(callback); // captura dados da API

    return {
      current: {
        date: forecastdayOne.date,
        icon: forecastdayOne.day.condition.icon,
        temp: data.current.temp_c,
        location:{
          name: data.location.name, 
          region: data.location.region
        },
        tempMax: forecastdayOne.day.maxtemp_c,
        sunset: forecastdayOne.astro.sunset,
        precipitation: getForecastData(days => days.day.daily_chance_of_rain), 
        //FORECASTDAY.DAY.TOTALPRECIPT - PESQUISAR POR HORA *****************
      },
      forecastday: {
        day: getForecastData(day => day.date),
        percentPrecipitation: getForecastData(day => day.day.totalprecip_mm), // DIVIDIR POR CEM E MULTIPLICAR POR CEM
        temp: {
          current: getForecastData(day => day.day.avgtemp_c),
          min: getForecastData(day => day.day.mintemp_c),
          max: getForecastData(day => day.day.maxtemp_c)
        },
        icon: getForecastData(day => day.day.condition.icon),
        chanceOfRain: getForecastData(day => day.day.daily_chance_of_rain)

      }
    }
  }
    // DATA.FORECAST
  return dataWeather;
};