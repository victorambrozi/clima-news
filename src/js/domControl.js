import { fetchAPI } from "../index.js";

const city = document.querySelector("#search").value;
const submit = document.querySelector("#submit");

console.log(city)

const handleSubmit = async (event) => {
    event.preventDefault();

   const data = await fetchAPI(city);
   console.log(data)

}

submit.addEventListener("click", handleSubmit);