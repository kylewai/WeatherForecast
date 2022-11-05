import React from 'react';
import GraphGoog from './graphGoog.js';

//Handles displaying of forecast for particular day in graph form

function displayForecast(index){
  this.setState({
    dayToRender: this.state.daySequence.dateOrder[index]
  });
}

function renderForecast(){
  var dateToRenderMillis = this.state.dayToRender;
  var dateToRender = (new Date(dateToRenderMillis)).setHours(0, 0, 0, 0);
  var fiveDayForecast = this.state.fivedayForecastData;
  var i = 0;
  var dataArr = [];
  fiveDayForecast.list.forEach(
    function (threeHourlyWeather) {
      var forecastTimeMillis = threeHourlyWeather.dt * 1000;
      if((new Date(forecastTimeMillis)).setHours(0, 0, 0, 0) !== dateToRender){
        console.log("noteq");
        return;
      }
      console.log("what" + threeHourlyWeather.main.temp);
      dataArr.push(
        {
          temp: ((threeHourlyWeather.main.temp - 273.15) * 9.0 / 5 + 32).toFixed(0),
          time: forecastTimeMillis
        });
    }
  );
  
  var genWeatherInfo = this.state.weatherObj.daily.find(
    function(dayWeather){
      return (dayWeather.dt * 1000) === dateToRenderMillis;
    }
  );
  var genWeather = genWeatherInfo.weather[0].main;
  var weatherDetails = genWeatherInfo.weather[0].description;

  var currMax = genWeatherInfo.temp.max;
  var currMaxFahr = ((currMax - 273.15) * 9.0 / 5 + 32).toFixed(0);
  return (
    <div>
      <p className="current-display-temp">{currMaxFahr}</p>
      <p>{genWeather}</p>
      <p>{weatherDetails}</p>
      <GraphGoog weatherData={dataArr} />
    </div>
  );

}

export {displayForecast, renderForecast};
