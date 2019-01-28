import React from 'react';
import GraphGoog from './graphGoog.js';

//Handles displaying of forecast for particular day in graph form

function displayForecast(index){
  this.setState({
    dayToRender: this.state.daySequence.dateOrder[index]
  });
}

function renderForecast(){
  var dateObj = new Date();
  console.log(dateObj);
  var dayToRender = this.state.dayToRender;
  var firstInstance = this.state.weatherObj.list.find(
    function(thirdHourlyTemp){
      return thirdHourlyTemp.dt_txt.slice(0, 11) === dayToRender;
    }
  );

  var currMax = firstInstance.main.temp;
  var dataArr = [];
  if(this.state.dayToRender === this.state.currentDate + ' '){
    var currentTime = dateObj.getHours() + ':';
    currentTime += (dateObj.getMinutes() / 10 < 1)? '0' + dateObj.getMinutes() : dateObj.getMinutes();
    dataArr.push(
      {
        temp: this.state.currTemp,
        time: currentTime
      });
  }
  this.state.weatherObj.list.forEach(
    function (obj){
      var date = obj.dt_txt.slice(0, 11);
      var thirdHourlyTemp = obj.main.temp;
      if(!date.localeCompare(dayToRender)){
        dataArr.push(
          {
            temp: ((thirdHourlyTemp - 273.15) * 9.0 / 5 + 32).toFixed(0),
            time: obj.dt_txt.slice(11)
          });
        if(thirdHourlyTemp > currMax){
            currMax = thirdHourlyTemp;
        }
      }
    }
  )
  var currMaxFahr = ((currMax - 273.15) * 9.0 / 5 + 32).toFixed(0);
  var genWeather;
  var weatherDetails;
  //if card clicked on is today
  if(this.state.dayToRender === this.state.currentDate + ' '){
    genWeather = this.state.currWeatherObj.weather[0].main;
    weatherDetails = this.state.currWeatherObj.weather[0].description;
    return (
      <div>
        <p className="current-display-temp">{this.state.currTemp}</p>
        <p>{genWeather}</p>
        <p>{weatherDetails}</p>
        <GraphGoog weatherData={dataArr} />
      </div>
    );
  }
  else{
    genWeather = firstInstance.weather[0].main;
    weatherDetails = firstInstance.weather[0].description;
    return (
      <div>
        <p className="current-display-temp">{currMaxFahr}</p>
        <p>{genWeather}</p>
        <p>{weatherDetails}</p>
        <GraphGoog weatherData={dataArr} />
      </div>
    );
  }
}

export {displayForecast, renderForecast};
