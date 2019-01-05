import React, { Component } from 'react';
import {BackButton} from './Nav';
import DayCardList from './DayCard';

class WeatherPageLayout extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "container-fluid" style = {{backgroundSize: '100% 100%', height: '100vh', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundImage: 'url(https://image.freepik.com/foto-gratis/cielo-de-las-nubes-de-la-sol-durante-fondo-de-la-manana-azul-cielo-pastel-blanco-foco-suave-foco-de-luz-solar-resumen-borrosa-cian-degradado-de-la-naturaleza-pacifica-abrir-la-vista-hacia-fuera-las-ventanas-primavera-de-verano-hermoso_1253-1313.jpg)'}}>
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
    <p style = {{textAlign: 'center', backgroundColor: '#66f0f9', padding: '5px', margin: '0'}}><strong>
      {props.location['city'] + ", " + props.location['country']}
    </strong></p>
  ) :
  (
    <p style = {{textAlign: 'center', backgroundColor: '#66f0f9', padding: '5px', margin: '0', whiteSpace: 'pre-line'}}><strong>
      {"Lat: " + props.searchCoords['lat']} <br></br>
      {"Lon: " + props.searchCoords['long']}
    </strong></p>
  );
}

export default WeatherPageLayout;
