import React from 'react';
//Performs API fetching to get weather
//forecast, current weather data, and user location

function checkError(lat, long){
  var errors = [];
  var isErr = false;
  if(lat > 90 || lat < -90 || long > 180 || long < -180){
    errors.push("Invalid coordinates: (-90 < Latitude < 90) | (-180 < Longitude < 180)");
    isErr = true;
  }
  if(lat === "" || long === "" || isNaN(parseInt(lat)) || isNaN(parseInt(long))){
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
  var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' +
     latitude + '&lon=' + longitude + '&APPID=';
  const APIKEY = '606932a10e94518fbb30ea03566eba3a';
  url += APIKEY;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        var dateOrder = [];
        var dayOrder = [];
        var firstDate = result.list[0].dt_txt.slice(0, 11);
        dateOrder.push(firstDate);
        dayOrder.push(new Date(firstDate).getDay());
        var currDate = firstDate;
        //Adding new date to arrays for each unique date
        result.list.forEach(
          function(obj){
            if(obj.dt_txt.slice(0, 11) !== currDate){
              currDate = obj.dt_txt.slice(0, 11);
              var date = new Date(currDate);
              dayOrder.push(date.getDay());
              dateOrder.push(currDate.slice(0, 11));
            }
          }
        )
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
  this.getCurrWeather(buttonSelection);
}

function getCurrWeather(buttonSelection){
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
  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=';
  const APIKEY = '606932a10e94518fbb30ea03566eba3a';
  url += APIKEY;
  fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        var KelTemp = result.main.temp;
        var FahrTemp = ((KelTemp - 273.15) * 9 / 5 + 32).toFixed(0);
        this.setState({
          currTemp: FahrTemp,
          currWeatherObj: result
        });
      }
    )
    return null;
}

function getUserLocation(){
  fetch("https://ipinfo.io/json").then(
    (response) => {return response.json()}
    ).then(
    (data) => {
      var userCoords = this.state.coords;
      var userLocation = this.state.location;
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

export {checkError, getWeatherData, getCurrWeather, getUserLocation};
