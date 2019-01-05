import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

//MenuScreen components and pop-up coordinate input fields

class MenuScreen extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (this.props.weatherChoice)? <Redirect to = "/weather" /> :
    (
      <div className = "container-fluid" style = {{paddingTop: '250px', backgroundSize: '100% 100%', height: '100vh', backgroundRepeat: 'no-repeat', backgroundImage: 'url(https://image.freepik.com/foto-gratis/cielo-de-las-nubes-de-la-sol-durante-fondo-de-la-manana-azul-cielo-pastel-blanco-foco-suave-foco-de-luz-solar-resumen-borrosa-cian-degradado-de-la-naturaleza-pacifica-abrir-la-vista-hacia-fuera-las-ventanas-primavera-de-verano-hermoso_1253-1313.jpg)'}}>
        <div className = "row">
          <div className = "col-sm-3">
          </div>
          <div className = "col-sm-2" style = {{position: 'relative'}}>
            <button onClick = {this.props.generateInputFields} className = "btn btn-primary" type = "submit" style = {{position: 'absolute', bottom: 0}}>Enter Coordinates</button>
          </div>
          <div className = "col-sm-1">
          </div>
          <div className = "col-sm-3">
            <button onClick = {() => this.props.getWeatherData("local")} className = "btn btn-primary" type = "submit">Weather for {this.props.location["city"]}, {this.props.location['country']}</button>
          </div>
        </div>
        <div className = "row">
          <div className = "col-sm-3">
          </div>
          <div className = "col-sm-3" style = {{position: 'relative'}}>
            {this.props.inputCoords && <CoordInput updateCoordsInput = {this.props.updateCoordsInput} getWeatherData = {this.props.getWeatherData}
            searchCoords = {this.props.searchCoords} errors = {this.props.errors}/> }
          </div>
        </div>
      </div>
    );
  }
}

function CoordInput(props){
  return(
    <div>
      <input onChange = {props.updateCoordsInput} value = {props.searchCoords['lat']} name = "lat" placeholder = "Latitude" type = "text" style = {{margin: '10px 0px 5px 0px'}}/>
      <br></br>
      <input onChange = {props.updateCoordsInput} value = {props.searchCoords['long']} name = "long" placeholder = "Longitude" type = "text" style = {{marginBottom: '5px'}}/>
      <br></br>
      {props.errors.map((i, index) => {
        return <p key = {index} style = {{color: 'red'}}><strong>{i}</strong></p>
      })}
      <button onClick = {() => props.getWeatherData("search")} className = "btn btn-primary">Submit</button>
    </div>
  );
}

function updateCoordsInput(event){
  var target = event.target;
  var name = target.name;
  var coords = this.state.searchCoords;
  coords[name] = target.value;
  this.setState({
    searchCoords: coords
  });
}

function generateInputFields(){
  this.setState({
    inputCoords: true
  });
}

export default MenuScreen;
export {CoordInput, updateCoordsInput, generateInputFields};
