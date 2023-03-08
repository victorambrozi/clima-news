import { fetchAPI } from "./weather.js";
import { controlChart } from "./chart.js";

const submit = document.querySelector("#submit");


const handleSubmit = async (event) => {
    const city = document.querySelector("#search").value;
    event.preventDefault();

   const data = await fetchAPI(city);
    console.log(data)
    controlChart(data.current);
}

submit.addEventListener("click", handleSubmit);
