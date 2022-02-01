import Data from "/config.js";
import {
    createCurrentCard, createDailyCards 
} from "./modules/createcards.js";

const currentWeatherWrapper = document.getElementById("currentWeatherWrapper");
const carouselInner = document.getElementById("carouselInner");

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
    createDailyCards(result);
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