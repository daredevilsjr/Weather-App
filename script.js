const apiKey = "6e2242a0d8ace345900583a2d57d4101";

import { cities } from "./cities.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");

const suggestionBox = document.getElementById("suggestions");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
   const cityName = cityInput.value.trim();

   if(cityName==="") {
      error.innerText="please enter a city name";
      return;
   }
   error.innerText="";
   try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&units=metric&appid=${apiKey}`);

      if(!res.ok) {
         throw new Error("City not found");
      }

      const data = await res.json();

      city.innerText = data.name;
      temp.innerText = `${Math.round(data.main.temp)}°C`;
      condition.innerText = data.weather[0].main;
      humidity.innerText = data.main.humidity;
      wind.innerText = data.wind.speed;
   }
   catch(err) {
      error.innerText= "City not found ❌";
   }
}

cityInput.addEventListener("input", () => {
   const value = cityInput.value.toLowerCase();
   suggestionBox.innerHTML = "";
   if(value==="") return;

   const filteredCities = cities.filter(city=> 
      city.toLowerCase().startsWith(value)
   );

   filteredCities.forEach(city => {
      const li = document.createElement("li");
      li.innerText = city;
      li.addEventListener("click", ()=> {
         cityInput.value = city;
         suggestionBox.innerHTML= "";
      });

      suggestionBox.appendChild(li);
   });
})

