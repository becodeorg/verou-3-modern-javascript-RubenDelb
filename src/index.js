import Data from "./config.js";
import { createCurrentCard, createDailyCards } from "./createCards.js";
import {
  createFirstChart,
  createSecondChart,
  createRainChart,
} from "./createCharts.js";
import "./style.scss";

const currentWeatherWrapper = document.getElementById("currentWeatherWrapper");
const carouselInner = document.getElementById("carouselInner");

const createEverything = (result) => {
  const chartsSection = document.getElementsByClassName("charts")[0];
  chartsSection.style.display = "block";
  console.log(result);
  createCurrentCard(result);
  createDailyCards(result);
  createFirstChart(result);
  createSecondChart(result);
  createRainChart(result);
};

const displayAlert = () => {
  const chartsSection = document.getElementsByClassName("charts")[0];
  chartsSection.style.display = "none";
  carouselInner.innerHTML = ""; //Make sure the previous searchresults will disappear
  currentWeatherWrapper.innerHTML = ""; //Make sure the previous searchresults will disappear
  const myAlert = () => {
    alert("This location does not exist in our database");
  };
  setTimeout(myAlert, 500);
};

const getPictureOfCity = (searchInput) => {
  fetch(
    "https://api.unsplash.com/search/photos?query=" +
      searchInput +
      "&client_id=" +
      Data.UNSPLASH_API_KEY
  )
    .then((response) => response.json())
    .then((unsplashData) => {
      console.log(unsplashData);
      const randomNumber = Math.round(
        Math.random() * unsplashData.results.length
      );
      document.body.style.backgroundImage =
        "url(" + unsplashData.results[randomNumber].urls.regular + ")";
    });
};

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  const searchBar = document.getElementById("searchBar");
  let searchInput = searchBar.value.toLowerCase();
  carouselInner.innerHTML = ""; //Make sure the previous searchresults will disappear
  currentWeatherWrapper.innerHTML = ""; //Make sure the previous searchresults will disappear
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchInput +
      "&appid=" +
      Data.key
  )
    .then((response) => response.json())
    .then((data) => {
      const lat = data.city.coord.lat; //catch the latitude of the city that the user has typed
      const long = data.city.coord.lon; //catch the longitude of the city that the user has typed
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          long +
          "&exclude=minutely&units=metric&appid=" +
          Data.key
      )
        .then((response) => response.json())
        .then(createEverything)
        .then(getPictureOfCity(searchInput));
    })
    .catch(displayAlert);
});
