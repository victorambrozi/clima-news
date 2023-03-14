const API_KEY = "9f916719091d4adbb1c234509230703";

export const fetchAPI = async (city) => {
  const baseURL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city === null ? "Salvador" : city
    }&days=7&aqi=no&alerts=no&lang=pt_br`;
  const response = await fetch(baseURL);
  const data = await response.json();

  const forecastdayOne = data.forecast.forecastday[0];
  const getForecastData = (callback) => data.forecast.forecastday.map(callback); // captura dados por dia da API

  const currentDay = getForecastData((dayWeek) => dayWeek.hour)[0];

  const forecastHour = [
    // chance de chuva nos determinados horários
    currentDay[8].chance_of_rain,
    currentDay[12].chance_of_rain,
    currentDay[16].chance_of_rain,
    currentDay[20].chance_of_rain,
    currentDay[23].chance_of_rain,
  ];

  const dataWeather = {
    // dados tratados para aplicação
    current: {
      date: forecastdayOne.date,
      icon: forecastdayOne.day.condition.icon,
      temp: data.current.temp_c,
      location: {
        name: data.location.name,
        region: data.location.region,
      },
      tempMax: forecastdayOne.day.maxtemp_c,
      sunset: forecastdayOne.astro.sunset,
      precipitation: getForecastData((days) => days.day.daily_chance_of_rain),
      forecastHour,
    },
    forecastday: data.forecast.forecastday
    
};

// salvar no localStorage
localStorage.setItem("dataWeather", JSON.stringify(dataWeather));
console.log(data)
return dataWeather;
};
