/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/config.js":
/*!***************************!*\
  !*** ./modules/config.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Data = {\n  key: 'c2a8355a1f5b4c7f1f722fb4ec6e7c0f',\n  UNSPLASH_API_KEY: \"4avo3C4_Jw1jULeK83Tn4kuRkut5O7TCKE_ZXBRgMGc\"\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Data);\n\n//# sourceURL=webpack://modern-javascript-application/./modules/config.js?");

/***/ }),

/***/ "./src/createCards.js":
/*!****************************!*\
  !*** ./src/createCards.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createCurrentCard\": () => (/* binding */ createCurrentCard),\n/* harmony export */   \"createDailyCards\": () => (/* binding */ createDailyCards)\n/* harmony export */ });\n/* harmony import */ var _windDirectionConvertor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./windDirectionConvertor.js */ \"./src/windDirectionConvertor.js\");\n\n\nvar createElement = function createElement(element, className, parent) {\n  var newElement = document.createElement(element);\n  newElement.classList = className;\n  parent.appendChild(newElement);\n  return newElement;\n};\n\nvar createCurrentCard = function createCurrentCard(result) {\n  var currentWeatherWrapper = document.getElementById(\"currentWeatherWrapper\");\n  var currentResult = result.current;\n  var currentWeatherCard = createElement(\"div\", \"currentWeatherCard\", currentWeatherWrapper);\n  var currentTitleDiv = createElement(\"div\", \"currentTitleDiv\", currentWeatherCard);\n  var currentInfoDiv = createElement(\"div\", \"currentInfoDiv\", currentWeatherCard);\n  var currentTitle = createElement(\"h3\", \"currentTitle\", currentTitleDiv);\n  currentTitle.innerHTML = \"Current Weather\";\n  var currentHour = createElement(\"p\", \"currentHour\", currentTitleDiv);\n  var sec = currentResult.dt + result.timezone_offset;\n  currentHour.innerHTML = \"at \" + (new Date(sec * 1000).getHours() - 1) + \"h\";\n  var iconCurrent = createElement(\"img\", \"iconCurrent\", currentInfoDiv);\n  iconCurrent.src = \"http://openweathermap.org/img/wn/\" + currentResult.weather[0].icon + \"@2x.png\";\n  var currentTemperatureDiv = createElement(\"div\", \"currentTemperatureDiv\", currentInfoDiv);\n  var temperatureCurrent = createElement(\"h1\", \"temperatureCurrent\", currentTemperatureDiv);\n  temperatureCurrent.innerHTML = Math.round(currentResult.temp) + \"°C\";\n  var feelTemperatureCurrent = createElement(\"h6\", \"feelTemperatureCurrent\", currentTemperatureDiv);\n  feelTemperatureCurrent.innerHTML = \"feels like: \" + Math.round(currentResult.feels_like) + \"°C\";\n  var currentWindDiv = createElement(\"div\", \"currentWindDiv\", currentInfoDiv);\n  var currentWindIcon = createElement(\"img\", \"currentWindIcon\", currentWindDiv);\n  currentWindIcon.src = \"/images/up-arrow-svgrepo-com.svg\";\n  currentWindIcon.style.transform = \"rotate3d(0, 0, 1, \" + currentResult.wind_deg + \"deg)\";\n  var currentWindSpeed = createElement(\"h5\", \"currentWindSpeed\", currentWindDiv);\n  currentWindSpeed.innerHTML = Math.round(currentResult.wind_speed * 3.6) + \" km/h\";\n};\nvar createDailyCards = function createDailyCards(result) {\n  for (var i = 0; i < result.daily.length; i++) {\n    var carouselInner = document.getElementById(\"carouselInner\");\n    var card = document.createElement(\"div\");\n\n    if (result.daily[i] == result.daily[0]) {\n      card.classList.add(\"card\", \"carousel-item\", \"active\");\n    } else {\n      card.classList.add(\"card\", \"carousel-item\");\n    }\n\n    carouselInner.appendChild(card);\n    var displayDay = createElement(\"h3\", \"displayDay\", card);\n    var sec = result.daily[i].dt + result.timezone_offset;\n    displayDay.innerHTML = new Date(sec * 1000).toDateString();\n    var weatherImgDiv = createElement(\"div\", \"weatherImgDiv\", card);\n    var weatherInfoDiv = createElement(\"div\", \"weatherInfoDiv\", card);\n    var weatherIcon = createElement(\"img\", \"weatherIcon\", weatherImgDiv);\n    weatherIcon.src = \"http://openweathermap.org/img/wn/\" + result.daily[i].weather[0].icon + \"@2x.png\";\n    var windDiv = createElement(\"div\", \"windDiv\", weatherImgDiv);\n    var windIcon = createElement(\"img\", \"windIcon\", windDiv);\n    windIcon.src = \"/images/up-arrow-svgrepo-com.svg\";\n    windIcon.style.transform = \"rotate3d(0, 0, 1, \" + result.daily[i].wind_deg + \"deg)\";\n    var windDescriptionDiv = createElement(\"div\", \"windDescriptionDiv\", windDiv);\n    var windSpeed = createElement(\"h5\", \"windSpeed\", windDescriptionDiv);\n    windSpeed.innerHTML = Math.round(result.daily[i].wind_speed * 3.6) + \" km/h\";\n    var degree = (0,_windDirectionConvertor_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(result.daily[i]);\n    var windDirection = createElement(\"p\", \"windDirection\", windDescriptionDiv);\n    windDirection.innerHTML = degree;\n    var temperatureDiv = createElement(\"div\", \"temperatureDiv\", weatherInfoDiv);\n    var weatherDescription = createElement(\"p\", \"weatherDescription\", weatherInfoDiv);\n    weatherDescription.innerHTML = result.daily[i].weather[0].description;\n    var tempMax = createElement(\"p\", \"tempMax\", temperatureDiv);\n    tempMax.innerHTML = \"Max: \" + Math.round(result.daily[i].temp.max) + \"°C\";\n    var tempMin = createElement(\"p\", \"tempMin\", temperatureDiv);\n    tempMin.innerHTML = \"Min: \" + Math.round(result.daily[i].temp.min) + \"°C\";\n  }\n};\n\n//# sourceURL=webpack://modern-javascript-application/./src/createCards.js?");

/***/ }),

/***/ "./src/createCharts.js":
/*!*****************************!*\
  !*** ./src/createCharts.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createFirstChart\": () => (/* binding */ createFirstChart),\n/* harmony export */   \"createSecondChart\": () => (/* binding */ createSecondChart),\n/* harmony export */   \"createRainChart\": () => (/* binding */ createRainChart)\n/* harmony export */ });\nvar myFirstChart,\n    mySecondChart,\n    myRainChart = null;\n\nvar destroyOldChart = function destroyOldChart(chart) {\n  if (chart != null) {\n    chart.destroy();\n  }\n};\n\nvar msToBeaufort = function msToBeaufort(ms) {\n  return Math.ceil(Math.cbrt(Math.pow(ms / 0.836, 2)));\n};\n\nvar getEveryHour = function getEveryHour(result) {\n  var labels = [];\n\n  for (var i = 0; i < 24; i++) {\n    //Create the labels: ex: 14h, 15h, 16h,... for the upcoming 24hours\n    var unixHour = result.hourly[i].dt + result.timezone_offset;\n    var localHour = new Date(unixHour * 1000).getHours() + \"h\";\n    labels.push(localHour); //push every created hour inside the \"labels\"-array.\n  }\n\n  return labels;\n};\n\nvar createFirstChart = function createFirstChart(result) {\n  destroyOldChart(myFirstChart);\n  var labels = getEveryHour(result);\n  var temperatureData = [];\n  var feelTemperatureData = [];\n\n  for (var i = 0; i < 24; i++) {\n    var hourlyTemperatureData = result.hourly[i].temp;\n    var hourlyFeelTemperature = result.hourly[i].feels_like;\n    temperatureData.push(hourlyTemperatureData);\n    feelTemperatureData.push(hourlyFeelTemperature);\n  }\n\n  var data = {\n    labels: labels,\n    datasets: [{\n      label: 'Actual Temperature',\n      borderColor: 'rgb(255, 99, 132)',\n      data: temperatureData\n    }, {\n      label: 'Feels-like Temperature',\n      data: feelTemperatureData,\n      borderColor: 'rgb(44, 116, 150)'\n    }]\n  };\n  var config = {\n    type: 'line',\n    data: data,\n    options: {\n      scales: {\n        y: {\n          beginAtZero: false\n        }\n      }\n    }\n  };\n  myFirstChart = new Chart(document.getElementById('myFirstChart'), config);\n};\nvar createSecondChart = function createSecondChart(result) {\n  destroyOldChart(mySecondChart);\n  var labels = getEveryHour(result);\n  var windSpeedData = [];\n  var windGustsData = [];\n\n  for (var i = 0; i < 24; i++) {\n    var hourlyWindSpeed = msToBeaufort(result.hourly[i].wind_speed);\n    var hourlyWindGusts = msToBeaufort(result.hourly[i].wind_gust);\n    windSpeedData.push(hourlyWindSpeed);\n    windGustsData.push(hourlyWindGusts);\n  }\n\n  var data = {\n    labels: labels,\n    datasets: [{\n      label: 'Windspeed in bft',\n      data: windSpeedData,\n      borderColor: 'rgb(255, 99, 132)'\n    }, {\n      label: 'Windgusts in bft',\n      data: windGustsData,\n      borderColor: 'rgb(44, 116, 150)'\n    }]\n  };\n  var config = {\n    type: 'line',\n    data: data,\n    options: {\n      scales: {\n        y: {\n          beginAtZero: false\n        }\n      }\n    }\n  };\n  mySecondChart = new Chart(document.getElementById('mySecondChart'), config);\n};\n\nvar pushDataToArray = function pushDataToArray(hourlyPrecipitation, array) {\n  if (typeof hourlyPrecipitation != \"undefined\") {\n    //the data exists\n    array.push(hourlyPrecipitation[\"1h\"]);\n  } else {\n    // the data does not exist in the openweathermap-data\n    array.push(0);\n  }\n};\n\nvar createRainChart = function createRainChart(result) {\n  destroyOldChart(myRainChart);\n  var labels = getEveryHour(result);\n  var rainData = [];\n  var snowData = [];\n\n  for (var i = 0; i < 24; i++) {\n    pushDataToArray(result.hourly[i].rain, rainData);\n    pushDataToArray(result.hourly[i].snow, snowData);\n  }\n\n  var data = {\n    labels: labels,\n    datasets: [{\n      label: 'Rain in mm',\n      backgroundColor: 'rgb(49, 135, 216)',\n      borderColor: 'rgb(255, 99, 132)',\n      data: rainData\n    }, {\n      label: 'Snow in mm',\n      backgroundColor: 'rgb(168, 194, 219)',\n      borderColor: 'rgb(255, 99, 132)',\n      data: snowData\n    }]\n  };\n  var config = {\n    type: 'bar',\n    data: data,\n    options: {\n      scales: {\n        y: {\n          beginAtZero: true\n        }\n      }\n    }\n  };\n  myRainChart = new Chart(document.getElementById('myRainChart'), config);\n};\n\n//# sourceURL=webpack://modern-javascript-application/./src/createCharts.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/config.js */ \"./modules/config.js\");\n/* harmony import */ var _createCards_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createCards.js */ \"./src/createCards.js\");\n/* harmony import */ var _createCharts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createCharts.js */ \"./src/createCharts.js\");\n\n\n\nvar currentWeatherWrapper = document.getElementById(\"currentWeatherWrapper\");\nvar carouselInner = document.getElementById(\"carouselInner\");\n\nvar createEverything = function createEverything(result) {\n  var chartsSection = document.getElementsByClassName(\"charts\")[0];\n  chartsSection.style.display = \"block\";\n  console.log(result);\n  (0,_createCards_js__WEBPACK_IMPORTED_MODULE_1__.createCurrentCard)(result);\n  (0,_createCards_js__WEBPACK_IMPORTED_MODULE_1__.createDailyCards)(result);\n  (0,_createCharts_js__WEBPACK_IMPORTED_MODULE_2__.createFirstChart)(result);\n  (0,_createCharts_js__WEBPACK_IMPORTED_MODULE_2__.createSecondChart)(result);\n  (0,_createCharts_js__WEBPACK_IMPORTED_MODULE_2__.createRainChart)(result);\n};\n\nvar displayAlert = function displayAlert() {\n  var chartsSection = document.getElementsByClassName(\"charts\")[0];\n  chartsSection.style.display = \"none\";\n  carouselInner.innerHTML = \"\"; //Make sure the previous searchresults will disappear\n\n  currentWeatherWrapper.innerHTML = \"\"; //Make sure the previous searchresults will disappear\n\n  var myAlert = function myAlert() {\n    alert(\"This location does not exist in our database\");\n  };\n\n  setTimeout(myAlert, 500);\n};\n\nvar getPictureOfCity = function getPictureOfCity(searchInput) {\n  fetch(\"https://api.unsplash.com/search/photos?query=\" + searchInput + \"&client_id=\" + _modules_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].UNSPLASH_API_KEY).then(function (response) {\n    return response.json();\n  }).then(function (unsplashData) {\n    console.log(unsplashData);\n    var randomNumber = Math.round(Math.random() * unsplashData.results.length);\n    document.body.style.backgroundImage = \"url(\" + unsplashData.results[randomNumber].urls.regular + \")\";\n  });\n};\n\nvar submitBtn = document.getElementById(\"submitBtn\");\nsubmitBtn.addEventListener(\"click\", function () {\n  var searchBar = document.getElementById(\"searchBar\");\n  var searchInput = searchBar.value.toLowerCase();\n  carouselInner.innerHTML = \"\"; //Make sure the previous searchresults will disappear\n\n  currentWeatherWrapper.innerHTML = \"\"; //Make sure the previous searchresults will disappear\n\n  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + searchInput + '&appid=' + _modules_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].key).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    var lat = data.city.coord.lat; //catch the latitude of the city that the user has typed\n\n    var _long = data.city.coord.lon; //catch the longitude of the city that the user has typed\n\n    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + _long + '&exclude=minutely&units=metric&appid=' + _modules_config_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].key).then(function (response) {\n      return response.json();\n    }).then(createEverything).then(getPictureOfCity(searchInput));\n  })[\"catch\"](displayAlert);\n});\n\n//# sourceURL=webpack://modern-javascript-application/./src/index.js?");

/***/ }),

/***/ "./src/windDirectionConvertor.js":
/*!***************************************!*\
  !*** ./src/windDirectionConvertor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ windDirectionConvertor)\n/* harmony export */ });\nfunction windDirectionConvertor(dailyData) {\n  var deg = Math.floor(dailyData.wind_deg);\n\n  switch (true) {\n    case deg >= 360 && deg <= 21:\n      deg = \"N\";\n      break;\n\n    case deg >= 22 && deg <= 44:\n      deg = \"NNE\";\n      break;\n\n    case deg >= 45 && deg <= 66:\n      deg = \"NE\";\n      break;\n\n    case deg >= 67 && deg <= 89:\n      deg = \"ENE\";\n      break;\n\n    case deg >= 90 && deg <= 111:\n      deg = \"E\";\n      break;\n\n    case deg >= 112 && deg <= 134:\n      deg = \"ESE\";\n      break;\n\n    case deg >= 135 && deg <= 156:\n      deg = \"SE\";\n      break;\n\n    case deg >= 157 && deg <= 179:\n      deg = \"SSE\";\n      break;\n\n    case deg >= 180 && deg <= 201:\n      deg = \"S\";\n      break;\n\n    case deg >= 202 && deg <= 224:\n      deg = \"SSW\";\n      break;\n\n    case deg >= 225 && deg <= 246:\n      deg = \"SW\";\n      break;\n\n    case deg >= 247 && deg <= 269:\n      deg = \"WSW\";\n      break;\n\n    case deg >= 270 && deg <= 291:\n      deg = \"W\";\n      break;\n\n    case deg >= 292 && deg <= 314:\n      deg = \"WNW\";\n      break;\n\n    case deg >= 315 && deg <= 336:\n      deg = \"NW\";\n      break;\n\n    case deg >= 337 && deg <= 359:\n      deg = \"NNW\";\n      break;\n\n    default:\n      deg = \"no data\";\n  }\n\n  return deg; // return is very important to output the wanted result when the function is called.\n}\n\n//# sourceURL=webpack://modern-javascript-application/./src/windDirectionConvertor.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;