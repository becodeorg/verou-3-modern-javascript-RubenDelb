import Data from "/config.js";
import {
    windDirectionConvertor
} from "./windDirectionConvertor.js";

const currentWeatherWrapper = document.getElementById("currentWeatherWrapper");
const carouselInner = document.getElementById("carouselInner");

const createElement = (element, className, parent) => {
    const newElement = document.createElement(element);
    newElement.classList = className;
    parent.appendChild(newElement);
    return newElement;
}

const createCurrentCard = (result) => {
    const currentWeatherWrapper = document.getElementById("currentWeatherWrapper");
    const currentResult = result.current;
    const currentWeatherCard = createElement("div", "currentWeatherCard", currentWeatherWrapper);
    const currentTitleDiv = createElement("div", "currentTitleDiv", currentWeatherCard)
    const currentInfoDiv = createElement("div", "currentInfoDiv", currentWeatherCard);
    const currentTitle = createElement("h3", "currentTitle", currentTitleDiv)
    currentTitle.innerHTML = "Current Weather";
    const currentHour = createElement("p", "currentHour", currentTitleDiv)
    let sec = currentResult.dt + result.timezone_offset;
    currentHour.innerHTML = "at " + (new Date(sec * 1000).getHours() - 1) + "h";
    const iconCurrent = createElement("img", "iconCurrent", currentInfoDiv);
    iconCurrent.src = "http://openweathermap.org/img/wn/" + currentResult.weather[0].icon + "@2x.png";
    const currentTemperatureDiv = createElement("div", "currentTemperatureDiv", currentInfoDiv);
    const temperatureCurrent = createElement("h1", "temperatureCurrent", currentTemperatureDiv);
    temperatureCurrent.innerHTML = Math.round(currentResult.temp) + "°C";
    const feelTemperatureCurrent = createElement("h6", "feelTemperatureCurrent", currentTemperatureDiv);
    feelTemperatureCurrent.innerHTML = "feels like: " + Math.round(currentResult.feels_like) + "°C";
    const currentWindDiv = createElement("div", "currentWindDiv", currentInfoDiv);
    const currentWindIcon = createElement("img", "currentWindIcon", currentWindDiv);
    currentWindIcon.src = "/images/up-arrow-svgrepo-com.svg";
    currentWindIcon.style.transform = "rotate3d(0, 0, 1, " + currentResult.wind_deg + "deg)";
    const currentWindSpeed = createElement("h5", "currentWindSpeed", currentWindDiv);
    currentWindSpeed.innerHTML = Math.round(currentResult.wind_speed * 3.6) + " km/h"
}

const createDailyCard = (result, dailyResult) => {
    const carouselInner = document.getElementById("carouselInner")
    const card = document.createElement("div");
    if (dailyResult == result.daily[0]) {
        card.classList.add("card", "carousel-item", "active");
    } else {
        card.classList.add("card", "carousel-item");
    }
    carouselInner.appendChild(card);
    const displayDay = createElement("h3", "displayDay", card);
    let sec = dailyResult.dt + result.timezone_offset;
    displayDay.innerHTML = new Date(sec * 1000).toDateString();
    const weatherImgDiv = createElement("div", "weatherImgDiv", card);
    const weatherInfoDiv = createElement("div", "weatherInfoDiv", card);
    const weatherIcon = createElement("img", "weatherIcon", weatherImgDiv);
    weatherIcon.src = "http://openweathermap.org/img/wn/" + dailyResult.weather[0].icon + "@2x.png";
    const windDiv = createElement("div", "windDiv", weatherImgDiv);
    const windIcon = createElement("img", "windIcon", windDiv);
    windIcon.src = "/images/up-arrow-svgrepo-com.svg";
    windIcon.style.transform = "rotate3d(0, 0, 1, " + dailyResult.wind_deg + "deg)";
    const windDescriptionDiv = createElement("div", "windDescriptionDiv", windDiv);
    const windSpeed = createElement("h5", "windSpeed", windDescriptionDiv);
    windSpeed.innerHTML = Math.round(dailyResult.wind_speed * 3.6) + " km/h"
    const degree = windDirectionConvertor(dailyResult);
    const windDirection = createElement("p", "windDirection", windDescriptionDiv);
    windDirection.innerHTML = degree;
    const temperatureDiv = createElement("div", "temperatureDiv", weatherInfoDiv);
    const weatherDescription = createElement("p", "weatherDescription", weatherInfoDiv);
    weatherDescription.innerHTML = dailyResult.weather[0].description;
    const tempMax = createElement("p", "tempMax", temperatureDiv);
    tempMax.innerHTML = "Max: " + Math.round(dailyResult.temp.max) + "°C";
    const tempMin = createElement("p", "tempMin", temperatureDiv);
    tempMin.innerHTML = "Min: " + Math.round(dailyResult.temp.min) + "°C";
}

const createAllDayCards = (result) => {
    for (let i = 0; i < result.daily.length; i++) {
        createDailyCard(result, result.daily[i]);
    }
}

const getEveryHour = (result) => {
    const labels = [];
    for (let i = 0; i < 24; i++) { //Create the labels: ex: 14h, 15h, 16h,... for the upcoming 24hours
        const unixHour = result.hourly[i].dt + result.timezone_offset;
        const localHour = (new Date(unixHour * 1000).getHours()) + "h";
        labels.push(localHour); //push every created hour inside the "labels"-array.
    }
    return labels;
}

let myFirstChart, mySecondChart, myRainChart = null;

const destroyOldChart = (chart) => {
    if (chart != null) {
        chart.destroy();
    }
}

const createFirstChart = (result) => {
    destroyOldChart(myFirstChart)
    const labels = getEveryHour(result);
    let temperatureData = [];
    let feelTemperatureData = [];
    for (let i = 0; i < 24; i++) {
        const hourlyTemperatureData = result.hourly[i].temp;
        const hourlyFeelTemperature = result.hourly[i].feels_like;
        temperatureData.push(hourlyTemperatureData);
        feelTemperatureData.push(hourlyFeelTemperature);
    }
    const data = {
        labels: labels,
        datasets: [{
            label: 'Actual Temperature',
            borderColor: 'rgb(255, 99, 132)',
            data: temperatureData,
        }, {
            label: 'Feels-like Temperature',
            data: feelTemperatureData,
            borderColor: 'rgb(44, 116, 150)',
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    };
    myFirstChart = new Chart(
        document.getElementById('myFirstChart'),
        config
    );
}

const msToBeaufort = (ms) => {
    return Math.ceil(Math.cbrt(Math.pow(ms / 0.836, 2)));
}

const createSecondChart = (result) => {
    destroyOldChart(mySecondChart)
    const labels = getEveryHour(result);
    let windSpeedData = [];
    let windGustsData = [];
    for (let i = 0; i < 24; i++) {
        const hourlyWindSpeed = msToBeaufort(result.hourly[i].wind_speed);
        const hourlyWindGusts = msToBeaufort(result.hourly[i].wind_gust);
        windSpeedData.push(hourlyWindSpeed);
        windGustsData.push(hourlyWindGusts);
    }
    const data = {
        labels: labels,
        datasets: [{
            label: 'Windspeed in bft',
            data: windSpeedData,
            borderColor: 'rgb(255, 99, 132)',
        }, {
            label: 'Windgusts in bft',
            data: windGustsData,
            borderColor: 'rgb(44, 116, 150)',
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    };
    mySecondChart = new Chart(
        document.getElementById('mySecondChart'),
        config
    );
}

const pushDataToArray = (hourlyPrecipitation, array) => {
    if (typeof hourlyPrecipitation != "undefined") { //the data exists
        array.push(hourlyPrecipitation["1h"]);
    } else { // the data does not exist in the openweathermap-data
        array.push(0);
    }
}

const createRainChart = (result) => {
    destroyOldChart(myRainChart)
    const labels = getEveryHour(result);
    let rainData = [];
    let snowData = [];
    for (let i = 0; i < 24; i++) {
        pushDataToArray(result.hourly[i].rain, rainData)
        pushDataToArray(result.hourly[i].snow, snowData)
    }
    const data = {
        labels: labels,
        datasets: [{
                label: 'Rain in mm',
                backgroundColor: 'rgb(49, 135, 216)',
                borderColor: 'rgb(255, 99, 132)',
                data: rainData,
            },
            {
                label: 'Snow in mm',
                backgroundColor: 'rgb(168, 194, 219)',
                borderColor: 'rgb(255, 99, 132)',
                data: snowData,
            }
        ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
    myRainChart = new Chart(
        document.getElementById('myRainChart'),
        config
    );
}

const createEverything = (result) => {
    const chartsSection = document.getElementsByClassName("charts")[0];
    chartsSection.style.display = "block";
    console.log(result);
    createCurrentCard(result);
    createAllDayCards(result);
    createFirstChart(result);
    createSecondChart(result);
    createRainChart(result);
}

const displayAlert = () => {
    const chartsSection = document.getElementsByClassName("charts")[0];
    chartsSection.style.display = "none";
    carouselInner.innerHTML = ""; //Make sure the previous searchresults will disappear
    currentWeatherWrapper.innerHTML = ""; //Make sure the previous searchresults will disappear
    const myAlert = () => {
        alert("This location does not exist in our database")
    }
    setTimeout(myAlert, 500)
}

const getPictureOfCity = (searchInput) => {
    fetch("https://api.unsplash.com/search/photos?query=" + searchInput + "&client_id=" + Data.UNSPLASH_API_KEY)
        .then(response => response.json())
        .then(unsplashData => {
            console.log(unsplashData);
            const randomNumber = Math.round(Math.random() * unsplashData.results.length)
            document.body.style.backgroundImage = "url(" + unsplashData.results[randomNumber].urls.regular + ")"
        })
}

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
    const searchBar = document.getElementById("searchBar");
    let searchInput = searchBar.value.toLowerCase();
    carouselInner.innerHTML = ""; //Make sure the previous searchresults will disappear
    currentWeatherWrapper.innerHTML = ""; //Make sure the previous searchresults will disappear
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInput + '&appid=' + Data.key)
        .then(response => response.json())
        .then(data => {
            const lat = data.city.coord.lat; //catch the latitude of the city that the user has typed
            const long = data.city.coord.lon; //catch the longitude of the city that the user has typed
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely&units=metric&appid=' + Data.key)
                .then(response => response.json())
                .then(createEverything)
                .then(getPictureOfCity(searchInput))
        })
        .catch(displayAlert)
});