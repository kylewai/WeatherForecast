import React from 'react';

//DayCardList uses DayCard and CurrCondit to generate the
//list of weather cards.

function DayCardList(props){
  return(
    <ul className="card-list">
      {props.currTemp && <li className="curr-condit-list-element"><CurrCondit currTemp = {props.currTemp} currWeatherObj={props.currWeatherObj}/></li>}
      {props.daySequence.dayOrder.map((i, index) => {
        return(
          <li key={i} className="forecast-card-list-element" onClick={() => props.displayForecast(index)}>
            {props.weatherObj && props.currWeatherObj &&
              <DayCard day={i} dateToRender={props.daySequence.dateOrder[index]} currentDate={props.currentDate} weatherObj={props.weatherObj} currWeatherObj={props.currWeatherObj}/>
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
    <div className="day-card">
      <p>{dayOfWeekStr}</p>
      <img className="weather-icon" src={picSrc} alt={genWeather}></img>
      <p className="main-temp">{currMaxFahr}</p>
      <p className="max-temp">{currMaxFahr} &nbsp;</p>
      <p className="min-temp">{currMinFahr}</p>
    </div>
  );
}

function CurrCondit(props){
  var currTemp = props.currTemp;
  var currWeatherObj = props.currWeatherObj;
  var genWeather = currWeatherObj.weather[0].main;
  var details = currWeatherObj.weather[0].description;
  return(
    <div className="curr-condit-card">
      <p className="curr-text"><strong>Current</strong></p>
      <p className="curr-temp">{currTemp}</p>
      <p>{genWeather}</p>
      <p className="curr-condit-details">{details}</p>
    </div>
  );
}

export default DayCardList;
