import { fetchAPI } from "../index.js";

const submit = document.querySelector("#submit");


const handleSubmit = async (event) => {
    const city = document.querySelector("#search").value;
    event.preventDefault();

   const data = await fetchAPI(city);
    console.log(data)
}

submit.addEventListener("click", handleSubmit);