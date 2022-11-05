import React from 'react';

//DayCardList uses DayCard and CurrCondit to generate the
//list of weather cards.

function DayCardList(props){
  return(
    <ul className="card-list">
      {console.log(props.daySequence.dayOrder)}
      {props.currTemp && <li className="curr-condit-list-element"><CurrCondit currTemp = {props.currTemp} currWeatherObj={props.currWeatherObj}/></li>}
      {props.daySequence.dayOrder.map((i, index) => {
        return(
          <li key={i} className="forecast-card-list-element" onClick={() => props.displayForecast(index)}>
            {props.weatherObj &&
              <DayCard day={i} dateToRender={props.daySequence.dateOrder[index]} currentDate={props.currentDate} weatherObj={props.weatherObj} fivedayForecastData={props.fivedayForecastData} currWeatherObj={props.currWeatherObj}/>
            }
          </li>
        );
      })}
    </ul>
  );
}

function DayCard(props){
  var firstInstance = props.weatherObj.daily.find(
    function(dayWeather){
      return (dayWeather.dt * 1000) === props.dateToRender;
    }
  );
  var minTemp = firstInstance.temp.min;
  var maxTemp = firstInstance.temp.max;
  var minFahr = ((minTemp - 273.15) * 9.0 / 5 + 32).toFixed(0);
  var maxFahr = ((maxTemp - 273.15) * 9.0 / 5 + 32).toFixed(0);
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
  var genWeather = firstInstance.weather[0].main;
  var weatherIconKey = firstInstance.weather[0].icon;
  var picSrc = `http://openweathermap.org/img/wn/${weatherIconKey}@2x.png`

  return(
    <div className="day-card">
      <p>{dayOfWeekStr}</p>
      <img className="weather-icon" src={picSrc} title={genWeather} alt={genWeather}></img>
      <p className="main-temp">{maxFahr}</p>
      <p className="max-temp">{maxFahr} &nbsp;</p>
      <p className="min-temp">{minFahr}</p>
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
