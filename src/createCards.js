import windDirectionConvertor from "./windDirectionConvertor.js";

const createElement = (element, className, parent) => {
  const newElement = document.createElement(element);
  newElement.classList = className;
  parent.appendChild(newElement);
  return newElement;
};

console.log("Hello from createCards Line 10!");
export const createCurrentCard = (result) => {
  const currentWeatherWrapper = document.getElementById(
    "currentWeatherWrapper"
  );
  const currentResult = result.current;
  const currentWeatherCard = createElement(
    "div",
    "currentWeatherCard",
    currentWeatherWrapper
  );
  const currentTitleDiv = createElement(
    "div",
    "currentTitleDiv",
    currentWeatherCard
  );
  const currentInfoDiv = createElement(
    "div",
    "currentInfoDiv",
    currentWeatherCard
  );
  const currentTitle = createElement("h3", "currentTitle", currentTitleDiv);
  currentTitle.innerHTML = "Current Weather";
  const currentHour = createElement("p", "currentHour", currentTitleDiv);
  let sec = currentResult.dt + result.timezone_offset;
  currentHour.innerHTML = "at " + (new Date(sec * 1000).getHours() - 1) + "h";
  const iconCurrent = createElement("img", "iconCurrent", currentInfoDiv);
  iconCurrent.src =
    "http://openweathermap.org/img/wn/" +
    currentResult.weather[0].icon +
    "@2x.png";
  const currentTemperatureDiv = createElement(
    "div",
    "currentTemperatureDiv",
    currentInfoDiv
  );
  const temperatureCurrent = createElement(
    "h1",
    "temperatureCurrent",
    currentTemperatureDiv
  );
  temperatureCurrent.innerHTML = Math.round(currentResult.temp) + "°C";
  const feelTemperatureCurrent = createElement(
    "h6",
    "feelTemperatureCurrent",
    currentTemperatureDiv
  );
  feelTemperatureCurrent.innerHTML =
    "feels like: " + Math.round(currentResult.feels_like) + "°C";
  const currentWindDiv = createElement("div", "currentWindDiv", currentInfoDiv);
  const currentWindIcon = createElement(
    "img",
    "currentWindIcon",
    currentWindDiv
  );
  currentWindIcon.src = "/images/up-arrow-svgrepo-com.svg";
  currentWindIcon.style.transform =
    "rotate3d(0, 0, 1, " + currentResult.wind_deg + "deg)";
  const currentWindSpeed = createElement(
    "h5",
    "currentWindSpeed",
    currentWindDiv
  );
  currentWindSpeed.innerHTML =
    Math.round(currentResult.wind_speed * 3.6) + " km/h";
};

export const createDailyCards = (result) => {
  for (let i = 0; i < result.daily.length; i++) {
    const carouselInner = document.getElementById("carouselInner");
    const card = document.createElement("div");
    if (result.daily[i] == result.daily[0]) {
      card.classList.add("card", "carousel-item", "active");
    } else {
      card.classList.add("card", "carousel-item");
    }
    carouselInner.appendChild(card);
    const displayDay = createElement("h3", "displayDay", card);
    let sec = result.daily[i].dt + result.timezone_offset;
    displayDay.innerHTML = new Date(sec * 1000).toDateString();
    const weatherImgDiv = createElement("div", "weatherImgDiv", card);
    const weatherInfoDiv = createElement("div", "weatherInfoDiv", card);
    const weatherIcon = createElement("img", "weatherIcon", weatherImgDiv);
    weatherIcon.src =
      "http://openweathermap.org/img/wn/" +
      result.daily[i].weather[0].icon +
      "@2x.png";
    const windDiv = createElement("div", "windDiv", weatherImgDiv);
    const windIcon = createElement("img", "windIcon", windDiv);
    windIcon.src = "/images/up-arrow-svgrepo-com.svg";
    windIcon.style.transform =
      "rotate3d(0, 0, 1, " + result.daily[i].wind_deg + "deg)";
    const windDescriptionDiv = createElement(
      "div",
      "windDescriptionDiv",
      windDiv
    );
    const windSpeed = createElement("h5", "windSpeed", windDescriptionDiv);
    windSpeed.innerHTML =
      Math.round(result.daily[i].wind_speed * 3.6) + " km/h";
    const degree = windDirectionConvertor(result.daily[i]);
    const windDirection = createElement(
      "p",
      "windDirection",
      windDescriptionDiv
    );
    windDirection.innerHTML = degree;
    const temperatureDiv = createElement(
      "div",
      "temperatureDiv",
      weatherInfoDiv
    );
    const weatherDescription = createElement(
      "p",
      "weatherDescription",
      weatherInfoDiv
    );
    weatherDescription.innerHTML = result.daily[i].weather[0].description;
    const tempMax = createElement("p", "tempMax", temperatureDiv);
    tempMax.innerHTML = "Max: " + Math.round(result.daily[i].temp.max) + "°C";
    const tempMin = createElement("p", "tempMin", temperatureDiv);
    tempMin.innerHTML = "Min: " + Math.round(result.daily[i].temp.min) + "°C";
  }
};
