import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import './App.css';
import WeatherPageLayout from './WeatherPage';
import {resetFields} from './Nav';
import {displayForecast, renderForecast} from './Forecast';
import MenuScreen, {updateCoordsInput, generateInputFields} from './MenuScreen';
import {checkError, getWeatherData, getFiveDayForecast, getUserLocation} from './WeatherData';

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
    this.state = {
      weatherChoice: false,
      inputCoords: false,
      location: {
        city: '',
        country: ''
      },
      coords: {
        lat: '',
        long: ''
      },
      searchCoords: {
        lat: '',
        long: ''
      },
      daySequence: {
        dayOrder: [],
        dateOrder: []
      },
      dayToRender: null,
      currentDate: realDate,
      currTemp: '',
      dayMax: '',
      weatherObj: null,
      fivedayForecastData: null,
      errors: []
    }
    this.renderForecast = renderForecast.bind(this);
    this.getUserLocation = getUserLocation.bind(this);
    this.getWeatherData = getWeatherData.bind(this);
    this.getFiveDayForecast = getFiveDayForecast.bind(this);
    this.generateInputFields = generateInputFields.bind(this);
    this.updateCoordsInput = updateCoordsInput.bind(this);
    this.checkError = checkError.bind(this);
    this.resetFields = resetFields.bind(this);
    this.displayForecast = displayForecast.bind(this);
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
    this.getUserLocation();
    console.log("yes");
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => (<MenuScreen {...props} location={this.state.location}
            getWeatherData={this.getWeatherData} generateInputFields={this.generateInputFields} inputCoords={this.state.inputCoords}
            weatherChoice={this.state.weatherChoice} updateCoordsInput={this.updateCoordsInput} searchCoords={this.state.searchCoords}
            errors={this.state.errors}/>)} />

          <Route path="/weather" render={(props) => ((this.state.weatherObj)? (
            <WeatherPageLayout {...props} location={this.state.location} buttonSelection={this.state.buttonSelection}
              searchCoords={this.state.searchCoords} resetFields={this.resetFields} renderForecast={this.renderForecast}
              currWeatherObj={this.state.currWeatherObj} currTemp={this.state.currTemp} daySequence={this.state.daySequence}
              displayForecast={this.displayForecast} weatherObj={this.state.weatherObj} fivedayForecastData={this.state.fivedayForecastData}
              currentDate={this.state.currentDate} dayToRender={this.state.dayToRender}/>
            ) : <Redirect to="/" /> )} />
        </div>
      </Router>
    );
  }
}

export default App;
