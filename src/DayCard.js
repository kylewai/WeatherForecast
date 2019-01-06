import React from 'react';

//DayCardList uses DayCard and CurrCondit to generate the
//list of weather cards.

function DayCardList(props){
  return(
    <ul style = {{display: 'inline', padding: '0px', margin: '0px'}}>
      {props.currTemp && <li style = {{display: 'inline', marginRight: '50px'}}><CurrCondit currTemp = {props.currTemp} currWeatherObj = {props.currWeatherObj}/></li>}
      {props.daySequence.dayOrder.map((i, index) => {
        return(
          <li key = {i} onClick = {() => props.displayForecast(index)} style = {{display: 'inline', width: '75px'}}>
            {props.weatherObj && props.currWeatherObj &&
              <DayCard day = {i} dateToRender = {props.daySequence.dateOrder[index]} currentDate = {props.currentDate} weatherObj = {props.weatherObj} currWeatherObj = {props.currWeatherObj}/>
            }
          </li>
        );
      })}
    </ul>
  );
}

function DayCard(props){
  var firstInstance = props.weatherObj.list.find(
    function(thirdHourlyTemp){
      return thirdHourlyTemp.dt_txt.slice(0, 11) === props.dateToRender;
    }
  );
  var currMin = firstInstance.main.temp;
  var currMax = firstInstance.main.temp;
  props.weatherObj.list.forEach(
    function (obj){
      var date = obj.dt_txt.slice(0, 11);
      var thirdHourlyTemp = obj.main.temp;
      if(!date.localeCompare(props.dateToRender)){
        if(thirdHourlyTemp > currMax){
          currMax = thirdHourlyTemp;
        }
        else if(thirdHourlyTemp < currMin){
          currMin = thirdHourlyTemp;
        }
      }
    }
  )
  var currMinFahr = ((currMin - 273.15) * 9.0 / 5 + 32).toFixed(0);
  var currMaxFahr = ((currMax - 273.15) * 9.0 / 5 + 32).toFixed(0);
  var dayOfWeek = props.day;
  var dayOfWeekStr;
  switch(dayOfWeek){
    case 0: dayOfWeekStr = 'Sunday'; break;
    case 1: dayOfWeekStr = 'Monday'; break;
    case 2: dayOfWeekStr = 'Tuesday'; break;
    case 3: dayOfWeekStr = 'Wednesday'; break;
    case 4: dayOfWeekStr = 'Thursday'; break;
    case 5: dayOfWeekStr = 'Friday'; break;
    case 6: dayOfWeekStr = 'Saturday'; break;
  }
  var genWeather;
  var weatherDetails;
  if(props.dateToRender === props.currentDate){
    genWeather = props.currWeatherObj.weather[0].main;
    weatherDetails = props.currWeatherObj.weather[0].description;
  }
  else{
    genWeather = firstInstance.weather[0].main;
    weatherDetails = firstInstance.weather[0].description;
  }
  var picSrc;
  switch(genWeather){
    case 'Rain': picSrc = 'sunnyRainy.jpg';
    break;
    case 'Clouds': picSrc = 'sunnyCloudy.jpg';
    break;
    case 'Clear': picSrc = 'sunny.jpg';
    break;
    case 'Thunderstorm': picSrc = 'thunderstorm.jpg';
    break;
    case 'Snow': picSrc = 'snow.jpg';
  }

  return(
    <div style = {{width: '105px', display: 'inline-table', border: '1px solid lightgrey', padding: '10px', textAlign: 'center', marginRight: '-1px'}}>
      <p>{dayOfWeekStr}</p>
      <img style = {{width: '60px', height: '60px'}} src = {picSrc} alt = {genWeather}></img>
      <p style = {{fontSize: '18px', margin: '5px 0px 5px 0px'}}>{currMaxFahr}</p>
      <p style = {{fontSize: '15px', display: 'inline'}}>{currMaxFahr} &nbsp;</p>
      <p style = {{color: 'lightgrey', display: 'inline'}}>{currMinFahr}</p>
    </div>
  );
}

function CurrCondit(props){
  var currTemp = props.currTemp;
  var currWeatherObj = props.currWeatherObj;
  var genWeather = currWeatherObj.weather[0].main;
  var details = currWeatherObj.weather[0].description;
  return(
    <div style = {{textAlign: 'center', border: '2px solid black',
    display: 'inline-table', padding: '10px', width: '125px'}}>
      <p style = {{color: 'lightgreen'}}><strong>Current</strong></p>
      <p style = {{fontSize: '25px'}}>{currTemp}</p>
      <p>{genWeather}</p>
      <p style = {{marginBottom: '2px'}}>{details}</p>
    </div>
  );
}

export default DayCardList;
