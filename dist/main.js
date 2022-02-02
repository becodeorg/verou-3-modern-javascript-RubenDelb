/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/config.js":
/*!***************************!*\
  !*** ./modules/config.js ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "./src/createCards.js":
/*!****************************!*\
  !*** ./src/createCards.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCurrentCard": () => (/* binding */ createCurrentCard),
/* harmony export */   "createDailyCards": () => (/* binding */ createDailyCards)
/* harmony export */ });
/* harmony import */ var _windDirectionConvertor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./windDirectionConvertor.js */ "./src/windDirectionConvertor.js");


var createElement = function createElement(element, className, parent) {
  var newElement = document.createElement(element);
  newElement.classList = className;
  parent.appendChild(newElement);
  return newElement;
};

console.log("Hello from createCards Line 10!");
var createCurrentCard = function createCurrentCard(result) {
  var currentWeatherWrapper = document.getElementById("currentWeatherWrapper");
  var currentResult = result.current;
  var currentWeatherCard = createElement("div", "currentWeatherCard", currentWeatherWrapper);
  var currentTitleDiv = createElement("div", "currentTitleDiv", currentWeatherCard);
  var currentInfoDiv = createElement("div", "currentInfoDiv", currentWeatherCard);
  var currentTitle = createElement("h3", "currentTitle", currentTitleDiv);
  currentTitle.innerHTML = "Current Weather";
  var currentHour = createElement("p", "currentHour", currentTitleDiv);
  var sec = currentResult.dt + result.timezone_offset;
  currentHour.innerHTML = "at " + (new Date(sec * 1000).getHours() - 1) + "h";
  var iconCurrent = createElement("img", "iconCurrent", currentInfoDiv);
  iconCurrent.src = "http://openweathermap.org/img/wn/" + currentResult.weather[0].icon + "@2x.png";
  var currentTemperatureDiv = createElement("div", "currentTemperatureDiv", currentInfoDiv);
  var temperatureCurrent = createElement("h1", "temperatureCurrent", currentTemperatureDiv);
  temperatureCurrent.innerHTML = Math.round(currentResult.temp) + "°C";
  var feelTemperatureCurrent = createElement("h6", "feelTemperatureCurrent", currentTemperatureDiv);
  feelTemperatureCurrent.innerHTML = "feels like: " + Math.round(currentResult.feels_like) + "°C";
  var currentWindDiv = createElement("div", "currentWindDiv", currentInfoDiv);
  var currentWindIcon = createElement("img", "currentWindIcon", currentWindDiv);
  currentWindIcon.src = "/images/up-arrow-svgrepo-com.svg";
  currentWindIcon.style.transform = "rotate3d(0, 0, 1, " + currentResult.wind_deg + "deg)";
  var currentWindSpeed = createElement("h5", "currentWindSpeed", currentWindDiv);
  currentWindSpeed.innerHTML = Math.round(currentResult.wind_speed * 3.6) + " km/h";
};
var createDailyCards = function createDailyCards(result) {
  for (var i = 0; i < result.daily.length; i++) {
    var carouselInner = document.getElementById("carouselInner");
    var card = document.createElement("div");

    if (result.daily[i] == result.daily[0]) {
      card.classList.add("card", "carousel-item", "active");
    } else {
      card.classList.add("card", "carousel-item");
    }

    carouselInner.appendChild(card);
    var displayDay = createElement("h3", "displayDay", card);
    var sec = result.daily[i].dt + result.timezone_offset;
    displayDay.innerHTML = new Date(sec * 1000).toDateString();
    var weatherImgDiv = createElement("div", "weatherImgDiv", card);
    var weatherInfoDiv = createElement("div", "weatherInfoDiv", card);
    var weatherIcon = createElement("img", "weatherIcon", weatherImgDiv);
    weatherIcon.src = "http://openweathermap.org/img/wn/" + result.daily[i].weather[0].icon + "@2x.png";
    var windDiv = createElement("div", "windDiv", weatherImgDiv);
    var windIcon = createElement("img", "windIcon", windDiv);
    windIcon.src = "/images/up-arrow-svgrepo-com.svg";
    windIcon.style.transform = "rotate3d(0, 0, 1, " + result.daily[i].wind_deg + "deg)";
    var windDescriptionDiv = createElement("div", "windDescriptionDiv", windDiv);
    var windSpeed = createElement("h5", "windSpeed", windDescriptionDiv);
    windSpeed.innerHTML = Math.round(result.daily[i].wind_speed * 3.6) + " km/h";
    var degree = (0,_windDirectionConvertor_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result.daily[i]);
    var windDirection = createElement("p", "windDirection", windDescriptionDiv);
    windDirection.innerHTML = degree;
    var temperatureDiv = createElement("div", "temperatureDiv", weatherInfoDiv);
    var weatherDescription = createElement("p", "weatherDescription", weatherInfoDiv);
    weatherDescription.innerHTML = result.daily[i].weather[0].description;
    var tempMax = createElement("p", "tempMax", temperatureDiv);
    tempMax.innerHTML = "Max: " + Math.round(result.daily[i].temp.max) + "°C";
    var tempMin = createElement("p", "tempMin", temperatureDiv);
    tempMin.innerHTML = "Min: " + Math.round(result.daily[i].temp.min) + "°C";
  }
};

/***/ }),

/***/ "./src/createCharts.js":
/*!*****************************!*\
  !*** ./src/createCharts.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFirstChart": () => (/* binding */ createFirstChart),
/* harmony export */   "createSecondChart": () => (/* binding */ createSecondChart),
/* harmony export */   "createRainChart": () => (/* binding */ createRainChart)
/* harmony export */ });
var myFirstChart,
    mySecondChart,
    myRainChart = null;

var destroyOldChart = function destroyOldChart(chart) {
  if (chart != null) {
    chart.destroy();
  }
};

var msToBeaufort = function msToBeaufort(ms) {
  return Math.ceil(Math.cbrt(Math.pow(ms / 0.836, 2)));
};

var getEveryHour = function getEveryHour(result) {
  var labels = [];

  for (var i = 0; i < 24; i++) {
    //Create the labels: ex: 14h, 15h, 16h,... for the upcoming 24hours
    var unixHour = result.hourly[i].dt + result.timezone_offset;
    var localHour = new Date(unixHour * 1000).getHours() + "h";
    labels.push(localHour); //push every created hour inside the "labels"-array.
  }

  return labels;
};

var createFirstChart = function createFirstChart(result) {
  destroyOldChart(myFirstChart);
  var labels = getEveryHour(result);
  var temperatureData = [];
  var feelTemperatureData = [];

  for (var i = 0; i < 24; i++) {
    var hourlyTemperatureData = result.hourly[i].temp;
    var hourlyFeelTemperature = result.hourly[i].feels_like;
    temperatureData.push(hourlyTemperatureData);
    feelTemperatureData.push(hourlyFeelTemperature);
  }

  var data = {
    labels: labels,
    datasets: [{
      label: 'Actual Temperature',
      borderColor: 'rgb(255, 99, 132)',
      data: temperatureData
    }, {
      label: 'Feels-like Temperature',
      data: feelTemperatureData,
      borderColor: 'rgb(44, 116, 150)'
    }]
  };
  var config = {
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
  myFirstChart = new Chart(document.getElementById('myFirstChart'), config);
};
var createSecondChart = function createSecondChart(result) {
  destroyOldChart(mySecondChart);
  var labels = getEveryHour(result);
  var windSpeedData = [];
  var windGustsData = [];

  for (var i = 0; i < 24; i++) {
    var hourlyWindSpeed = msToBeaufort(result.hourly[i].wind_speed);
    var hourlyWindGusts = msToBeaufort(result.hourly[i].wind_gust);
    windSpeedData.push(hourlyWindSpeed);
    windGustsData.push(hourlyWindGusts);
  }

  var data = {
    labels: labels,
    datasets: [{
      label: 'Windspeed in bft',
      data: windSpeedData,
      borderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Windgusts in bft',
      data: windGustsData,
      borderColor: 'rgb(44, 116, 150)'
    }]
  };
  var config = {
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
  mySecondChart = new Chart(document.getElementById('mySecondChart'), config);
};

var pushDataToArray = function pushDataToArray(hourlyPrecipitation, array) {
  if (typeof hourlyPrecipitation != "undefined") {
    //the data exists
    array.push(hourlyPrecipitation["1h"]);
  } else {
    // the data does not exist in the openweathermap-data
    array.push(0);
  }
};

var createRainChart = function createRainChart(result) {
  destroyOldChart(myRainChart);
  var labels = getEveryHour(result);
  var rainData = [];
  var snowData = [];

  for (var i = 0; i < 24; i++) {
    pushDataToArray(result.hourly[i].rain, rainData);
    pushDataToArray(result.hourly[i].snow, snowData);
  }

  var data = {
    labels: labels,
    datasets: [{
      label: 'Rain in mm',
      backgroundColor: 'rgb(49, 135, 216)',
      borderColor: 'rgb(255, 99, 132)',
      data: rainData
    }, {
      label: 'Snow in mm',
      backgroundColor: 'rgb(168, 194, 219)',
      borderColor: 'rgb(255, 99, 132)',
      data: snowData
    }]
  };
  var config = {
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
  myRainChart = new Chart(document.getElementById('myRainChart'), config);
};

/***/ }),

/***/ "./src/windDirectionConvertor.js":
/*!***************************************!*\
  !*** ./src/windDirectionConvertor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ windDirectionConvertor)
/* harmony export */ });
function windDirectionConvertor(dailyData) {
  var deg = Math.floor(dailyData.wind_deg);

  switch (true) {
    case deg >= 360 && deg <= 21:
      deg = "N";
      break;

    case deg >= 22 && deg <= 44:
      deg = "NNE";
      break;

    case deg >= 45 && deg <= 66:
      deg = "NE";
      break;

    case deg >= 67 && deg <= 89:
      deg = "ENE";
      break;

    case deg >= 90 && deg <= 111:
      deg = "E";
      break;

    case deg >= 112 && deg <= 134:
      deg = "ESE";
      break;

    case deg >= 135 && deg <= 156:
      deg = "SE";
      break;

    case deg >= 157 && deg <= 179:
      deg = "SSE";
      break;

    case deg >= 180 && deg <= 201:
      deg = "S";
      break;

    case deg >= 202 && deg <= 224:
      deg = "SSW";
      break;

    case deg >= 225 && deg <= 246:
      deg = "SW";
      break;

    case deg >= 247 && deg <= 269:
      deg = "WSW";
      break;

    case deg >= 270 && deg <= 291:
      deg = "W";
      break;

    case deg >= 292 && deg <= 314:
      deg = "WNW";
      break;

    case deg >= 315 && deg <= 336:
      deg = "NW";
      break;

    case deg >= 337 && deg <= 359:
      deg = "NNW";
      break;

    default:
      deg = "no data";
  }

  return deg; // return is very important to output the wanted result when the function is called.
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/config.js */ "./modules/config.js");
/* harmony import */ var _modules_config_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_config_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _createCards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createCards.js */ "./src/createCards.js");
/* harmony import */ var _createCharts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createCharts.js */ "./src/createCharts.js");



var currentWeatherWrapper = document.getElementById("currentWeatherWrapper");
var carouselInner = document.getElementById("carouselInner");

var createEverything = function createEverything(result) {
  var chartsSection = document.getElementsByClassName("charts")[0];
  chartsSection.style.display = "block";
  console.log(result);
  (0,_createCards_js__WEBPACK_IMPORTED_MODULE_1__.createCurrentCard)(result);
  (0,_createCards_js__WEBPACK_IMPORTED_MODULE_1__.createDailyCards)(result);
  (0,_createCharts_js__WEBPACK_IMPORTED_MODULE_2__.createFirstChart)(result);
  (0,_createCharts_js__WEBPACK_IMPORTED_MODULE_2__.createSecondChart)(result);
  (0,_createCharts_js__WEBPACK_IMPORTED_MODULE_2__.createRainChart)(result);
};

var displayAlert = function displayAlert() {
  var chartsSection = document.getElementsByClassName("charts")[0];
  chartsSection.style.display = "none";
  carouselInner.innerHTML = ""; //Make sure the previous searchresults will disappear

  currentWeatherWrapper.innerHTML = ""; //Make sure the previous searchresults will disappear

  var myAlert = function myAlert() {
    alert("This location does not exist in our database");
  };

  setTimeout(myAlert, 500);
};

var getPictureOfCity = function getPictureOfCity(searchInput) {
  fetch("https://api.unsplash.com/search/photos?query=" + searchInput + "&client_id=" + (_modules_config_js__WEBPACK_IMPORTED_MODULE_0___default().UNSPLASH_API_KEY)).then(function (response) {
    return response.json();
  }).then(function (unsplashData) {
    console.log(unsplashData);
    var randomNumber = Math.round(Math.random() * unsplashData.results.length);
    document.body.style.backgroundImage = "url(" + unsplashData.results[randomNumber].urls.regular + ")";
  });
};

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function () {
  var searchBar = document.getElementById("searchBar");
  var searchInput = searchBar.value.toLowerCase();
  carouselInner.innerHTML = ""; //Make sure the previous searchresults will disappear

  currentWeatherWrapper.innerHTML = ""; //Make sure the previous searchresults will disappear

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInput + '&appid=' + (_modules_config_js__WEBPACK_IMPORTED_MODULE_0___default().key)).then(function (response) {
    return response.json();
  }).then(function (data) {
    var lat = data.city.coord.lat; //catch the latitude of the city that the user has typed

    var _long = data.city.coord.lon; //catch the longitude of the city that the user has typed

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + _long + '&exclude=minutely&units=metric&appid=' + (_modules_config_js__WEBPACK_IMPORTED_MODULE_0___default().key)).then(function (response) {
      return response.json();
    }).then(createEverything).then(getPictureOfCity(searchInput));
  })["catch"](displayAlert);
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map