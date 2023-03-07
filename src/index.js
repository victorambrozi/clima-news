const apiKey = "e7837e0c2b4a085ed7b6286f81b6d4b5";

export const fetchAPI = async (city) => {
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city},BR&appid=${apiKey}&lang=pt_br&units=metric`;
  const response = await fetch(baseURL);
  const data = await response.json();

  const weather = {
    temperatura: {
      main: data.main.temp,
      max: data.main.temp_max,
      min: data.main.temp_min,
    }, // MAIN.TEMP
    regiao: {
      cidade: data.name,
      pais: data.sys.country,
    },
    sensacaoTermica: data.main.feels_like, //MAIN.FEELS_LIKE
    sol: {
      nascerDoSol: data.sys.sunrise,
      porDoSol: data.sys.sunset,
    },
  };

  return weather;
};
