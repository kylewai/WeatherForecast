import React, { Component } from 'react';
import {BackButton} from './Nav';
import DayCardList from './DayCard';

class WeatherPageLayout extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "container-fluid weather-page">
        <div className = "row">
          <div className = "col-sm-2">
            <ShowingLocation location = {this.props.location} buttonSelection = {this.props.buttonSelection} searchCoords = {this.props.searchCoords} />
            <BackButton resetFields = {this.props.resetFields} />
          </div>
          <div className = "col-sm-auto">
            <DayCardList currTemp = {this.props.currTemp} currWeatherObj = {this.props.currWeatherObj} daySequence = {this.props.daySequence}
              displayForecast = {this.props.displayForecast} weatherObj = {this.props.weatherObj} currentDate = {this.props.currentDate} />
            <br></br><br></br>
            {(this.props.dayToRender && this.props.currWeatherObj)? this.props.renderForecast() : <p>Click on cards to view forecast</p>}
          </div>
        </div>
      </div>
    );
  }
}

function ShowingLocation(props){
  return (props.buttonSelection === 'local')? (
    <p className="show-city"><strong>
      {props.location['city'] + ", " + props.location['country']}
    </strong></p>
  ) :
  (
    <p className="show-coords"><strong>
      {"Lat: " + props.searchCoords['lat']} <br></br>
      {"Lon: " + props.searchCoords['long']}
    </strong></p>
  );
}

export default WeatherPageLayout;
