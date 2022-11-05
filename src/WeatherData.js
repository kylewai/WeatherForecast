import React from 'react';
//Performs API fetching to get weather
//forecast, current weather data, and user location
const APIKEY = 'e65d49d4e52bab1fa850e7e4d3a3f63f';

function checkError(lat, long){
  var errors = [];
  var isErr = false;
  if(lat > 90 || lat < -90 || long > 180 || long < -180){
    errors.push("Invalid coordinates: (-90 < Latitude < 90) | (-180 < Longitude < 180)");
    isErr = true;
  }
  if(lat === "" || long === "" || isNaN(lat) || isNaN(long)){
    errors.push("Coordinates must be numeric");
    isErr = true;
  }
  this.setState({
    errors: errors
  });
  return isErr;
}

function getWeatherData(buttonSelection){
  var latitude = "";
  var longitude = "";
  if(buttonSelection === "local"){
    latitude = this.state.coords['lat'];
    longitude = this.state.coords['long'];
  }
  else{
    latitude = this.state.searchCoords['lat'];
    longitude = this.state.searchCoords['long'];
    if(this.checkError(latitude, longitude)){
      return;
    }
  }
  var url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' +
     latitude + '&lon=' + longitude + '&APPID=';
  url += APIKEY;
  console.log(url);
  // fetch("demoWeatherData.json")
  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        var dateOrder = [];
        var dayOrder = [];
        console.log(result.daily);
        var currDate;
        var i = 0;
        // var firstDate = result.daily[0].dt;
        result.daily.forEach(
          function(dayWeather) {
            if(i >= 5){
              return;
            }
            currDate = dayWeather.dt * 1000;
            dayOrder.push(new Date(currDate).getDay());
            dateOrder.push(currDate);
            i++
          }
        )
        console.log(dayOrder);
        console.log(dateOrder);
        this.setState({
          weatherObj: result,
          daySequence: {
            dayOrder: dayOrder,
            dateOrder: dateOrder
          },
          weatherChoice: true
        });
      }
    )
  this.setState({
    buttonSelection: buttonSelection
  });
  this.getFiveDayForecast(buttonSelection);
}

function getFiveDayForecast(buttonSelection){
  var latitude = "";
  var longitude = "";
  if(buttonSelection === "local"){
    latitude = this.state.coords['lat'];
    longitude = this.state.coords['long'];
  }
  else{
    latitude = this.state.searchCoords['lat'];
    longitude = this.state.searchCoords['long'];
  }
  var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=';
  url += APIKEY;
  // fetch("demoForecastData.json")
  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          fivedayForecastData: result
        });
      }
    )
    return null;
}

function getUserLocation(){
  fetch("https://ipinfo.io?token=f1584d719f1363").then(
    (response) => {return response.json()}
    ).then(
    (data) => {
      var userCoords = this.state.coords;
      var userLocation = this.state.location;
      console.log("kkw:" + data["loc"]);
      var location = data['loc'].split(',');
      userCoords['lat'] = location[0];
      userCoords['long'] = location[1];
      userLocation['city'] = data['city'];
      userLocation['country'] = data['country'];
      this.setState({
        coords: userCoords,
        location: userLocation
      });
    });
}

export {checkError, getWeatherData, getFiveDayForecast, getUserLocation};
