import React from 'react';
import {Link} from 'react-router-dom';

//Handles components and state mutations related to navigating back to main page

function BackButton(props){
  return(
    <button onClick = {props.resetFields} className = "btn btn-primary"><Link to = "/" style={{ textDecoration: 'none', color: 'white'}}>Back</Link></button>
  );
}

function resetFields(){
  var searchCoords = this.state.searchCoords;
  searchCoords['lat'] = '';
  searchCoords['long'] = '';
  this.setState({
    searchCoords: searchCoords,
    weatherChoice: false,
    inputCoords: false
  });
}

export {BackButton, resetFields};
