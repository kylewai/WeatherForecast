import React from 'react';
import GraphGoog from './graphGoog.js';

//Handles displaying of forecast for particular day in graph form

function displayForecast(index){
  this.setState({
    dayToRender: this.state.daySequence.dateOrder[index]
  });
}

function renderForecast(){
  var dateToRender = (new Date(this.state.dayToRender)).setHours(0, 0, 0, 0);
  var fiveDayForecast = this.state.fivedayForecastData;
  var i = 0;
  var dataArr = [];
  fiveDayForecast.list.forEach(
    function (threeHourlyWeather) {
      var forecastTimeMillis = threeHourlyWeather.dt * 1000;
      console.log("dateToRender " + dateToRender);
      console.log("forecasttime: " + forecastTimeMillis);
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
  // var currMax = firstInstance.main.temp;
  // if(this.state.dayToRender === this.state.currentDate + ' '){
  //   var currentTime = dateObj.getHours() + ':';
  //   currentTime += (dateObj.getMinutes() / 10 < 1)? '0' + dateObj.getMinutes() : dateObj.getMinutes();
  //   dataArr.push(
  //     {
  //       temp: this.state.currTemp,
  //       time: currentTime
  //     });
  // }
  // this.state.weatherObj.list.forEach(
  //   function (obj){
  //     var date = obj.dt_txt.slice(0, 11);
  //     var thirdHourlyTemp = obj.main.temp;
  //     if(!date.localeCompare(dayToRender)){
  //       dataArr.push(
  //         {
  //           temp: ((thirdHourlyTemp - 273.15) * 9.0 / 5 + 32).toFixed(0),
  //           time: obj.dt_txt.slice(11)
  //         });
  //       if(thirdHourlyTemp > currMax){
  //           currMax = thirdHourlyTemp;
  //       }
  //     }
  //   }
  // )
  var currMax = 273;
  var currMaxFahr = ((currMax - 273.15) * 9.0 / 5 + 32).toFixed(0);
  var genWeather;
  var weatherDetails;

  // genWeather = firstInstance.weather[0].main;
  // weatherDetails = firstInstance.weather[0].description;
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
