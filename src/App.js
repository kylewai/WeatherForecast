import React, { Component } from 'react';
import './App.css';
import GraphGoog from './graphGoog.js';

Date.prototype.addDays = function(days){
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  console.log(dat);
  return dat;
}

class App extends Component {

  constructor(props){
    super(props);
    var dateObj = this.getDateObj();
    var realDate = dateObj.year + '-' + dateObj.month + '-' + dateObj.date;
    console.log(realDate);
    this.state = {
      daySequence: {
        dayOrder: [],
        dateOrder: []
      },
      dayToRender: '',
      currentDate: realDate,
      currTemp: '',
      dayMax: '',
    }
    this.renderForecast = this.renderForecast.bind(this);
  }
  getDateObj(){
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var monthNumString = (month / 10 < 1)? '0' + month : month;
    var date = dateObj.getDate();
    var dateNumString = (date / 10 < 1)? '0' + date : date;
    var year = dateObj.getFullYear();
    return {month: monthNumString, date: dateNumString, year: year};
  }
  componentDidMount(){
      console.log(2345);
      var url = 'https://api.openweathermap.org/data/2.5/forecast?id=4241704&APPID=';
      const APIKEY = '606932a10e94518fbb30ea03566eba3a';
      url += APIKEY;
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
                if(obj.dt_txt.slice(0, 11) != currDate){
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
              }
            });
          }
        )

      this.getCurrWeather();
  }

  displayForecast(index){
    this.setState({
      dayToRender: this.state.daySequence.dateOrder[index]
    });
  }

  renderForecast(){
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
    console.log(this.state.currentDate);
    console.log(this.state.dayToRender);
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
          console.log(dayToRender);
          console.log(date);
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

    //if card clicked on is today
    if(this.state.dayToRender === this.state.currentDate + ' '){
      var genWeather = this.state.currWeatherObj.weather[0].main;
      var weatherDetails = this.state.currWeatherObj.weather[0].description;
      return (
        <div>
          <p style = {{fontSize: '25px'}}>{this.state.currTemp}</p>
          <p>{genWeather}</p>
          <p>{weatherDetails}</p>
          <GraphGoog weatherData = {dataArr} />
        </div>
      );
    }
    else{
      var genWeather = firstInstance.weather[0].main;
      var weatherDetails = firstInstance.weather[0].description;
      return (
        <div>
          <p style = {{fontSize: '25px'}}>{currMaxFahr}</p>
          <p>{genWeather}</p>
          <p>{weatherDetails}</p>
          <GraphGoog weatherData = {dataArr} />
        </div>
      );
    }
  }
  getCurrWeather(){
    var url = 'http://api.openweathermap.org/data/2.5/weather?id=4241704&APPID=';
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

  render() {
    return (
      <div style = {{backgroundSize: '100% 100%', height: '100%', backgroundRepeat: 'no-repeat', paddingLeft: '300px', backgroundImage: 'url(https://image.freepik.com/foto-gratis/cielo-de-las-nubes-de-la-sol-durante-fondo-de-la-manana-azul-cielo-pastel-blanco-foco-suave-foco-de-luz-solar-resumen-borrosa-cian-degradado-de-la-naturaleza-pacifica-abrir-la-vista-hacia-fuera-las-ventanas-primavera-de-verano-hermoso_1253-1313.jpg)'}}>
        <ul style = {{display: 'inline', padding: '0px', margin: '0px'}}>
          {this.state.currTemp && <li style = {{display: 'inline', marginRight: '50px'}}><CurrCondit currTemp = {this.state.currTemp} currWeatherObj = {this.state.currWeatherObj}/></li>}
          {this.state.daySequence.dayOrder.map((i, index) => {
            return(
              <li key = {i} onClick = {() => this.displayForecast(index)} style = {{display: 'inline', width: '75px'}}>
                {this.state.weatherObj && this.state.currWeatherObj &&
                  <DayCard day = {i} dateToRender = {this.state.daySequence.dateOrder[index]} currentDate = {this.state.currentDate} weatherObj = {this.state.weatherObj} currWeatherObj = {this.state.currWeatherObj}/>
                }
              </li>
            );
          })}
        </ul>
        <br></br><br></br>
        {this.state.dayToRender && this.state.currWeatherObj && this.renderForecast()}
      </div>
    );
  }
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
  var weatherDetails
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
  }

  return(
    <div style = {{display: 'inline-table', border: '1px solid lightgrey', padding: '10px', textAlign: 'center', marginRight: '-1px'}}>
      <p>{dayOfWeekStr}</p>
      <img style = {{width: '60px', height: '60px'}} src = {picSrc} alt = {genWeather}></img>
      <p style = {{fontSize: '18px'}}>{currMaxFahr}</p>
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
      <p style = {{color: 'green'}}><strong>Current</strong></p>
      <p style = {{fontSize: '25px'}}>{currTemp}</p>
      <p>{genWeather}</p>
      <p>{details}</p>
    </div>
  );
}

export default App;
