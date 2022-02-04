let myFirstChart,
  mySecondChart,
  myRainChart = null;

const destroyOldChart = (chart) => {
  if (chart != null) {
    chart.destroy();
  }
};

const msToBeaufort = (ms) => {
  return Math.ceil(Math.cbrt(Math.pow(ms / 0.836, 2)));
};

const getEveryHour = (result) => {
  const labels = [];
  for (let i = 0; i < 24; i++) {
    //Create the labels: ex: 14h, 15h, 16h,... for the upcoming 24hours
    const unixHour = result.hourly[i].dt + result.timezone_offset;
    const localHour = new Date(unixHour * 1000).getHours() + "h";
    labels.push(localHour); //push every created hour inside the "labels"-array.
  }
  return labels;
};

export const createFirstChart = (result) => {
  destroyOldChart(myFirstChart);
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
    datasets: [
      {
        label: "Actual Temperature",
        borderColor: "rgb(255, 99, 132)",
        data: temperatureData,
      },
      {
        label: "Feels-like Temperature",
        data: feelTemperatureData,
        borderColor: "rgb(44, 116, 150)",
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };
  // eslint-disable-next-line no-undef
  myFirstChart = new Chart(document.getElementById("myFirstChart"), config);
};

export const createSecondChart = (result) => {
  destroyOldChart(mySecondChart);
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
    datasets: [
      {
        label: "Windspeed in bft",
        data: windSpeedData,
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Windgusts in bft",
        data: windGustsData,
        borderColor: "rgb(44, 116, 150)",
      },
    ],
  };
  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };
  // eslint-disable-next-line no-undef
  mySecondChart = new Chart(document.getElementById("mySecondChart"), config);
};

const pushDataToArray = (hourlyPrecipitation, array) => {
  if (typeof hourlyPrecipitation != "undefined") {
    //the data exists
    array.push(hourlyPrecipitation["1h"]);
  } else {
    // the data does not exist in the openweathermap-data
    array.push(0);
  }
};

export const createRainChart = (result) => {
  destroyOldChart(myRainChart);
  const labels = getEveryHour(result);
  let rainData = [];
  let snowData = [];
  for (let i = 0; i < 24; i++) {
    pushDataToArray(result.hourly[i].rain, rainData);
    pushDataToArray(result.hourly[i].snow, snowData);
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Rain in mm",
        backgroundColor: "rgb(49, 135, 216)",
        borderColor: "rgb(255, 99, 132)",
        data: rainData,
      },
      {
        label: "Snow in mm",
        backgroundColor: "rgb(168, 194, 219)",
        borderColor: "rgb(255, 99, 132)",
        data: snowData,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  // eslint-disable-next-line no-undef
  myRainChart = new Chart(document.getElementById("myRainChart"), config);
};
