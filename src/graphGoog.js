import React, { Component } from 'react';
import {GoogleCharts} from 'google-charts';

var chart;
class GraphGoog extends Component{

  componentDidMount(){
    GoogleCharts.load(() => {this.drawChart()});
  }

  componentDidUpdate(){
    GoogleCharts.load(() => {this.drawChart()});
  }

  drawChart(){
    var data = new GoogleCharts.api.visualization.DataTable();
    data.addColumn('timeofday', 'Hour');
    data.addColumn('number', 'Temperature');
    var weat = [];
    this.props.weatherData.map((i) => {
        var hour = (parseInt(i.time.substr(0, 2)) - 5) % 24 + 24;
        var minute = parseInt(i.time.substr(3, 5));
        var seconds = 0;
        weat.push([[hour, minute, seconds], parseInt(i.temp)])
    });
    data.addRows(weat);
    chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart'));
    var options = {
      width: 700,
      height: '100%',
      chartArea: {left: 35, 'width': '100%', 'height': '70%'},
      backgroundColor: {fill: 'transparent'}
    }
    chart.draw(data, options);
  }

  render(){
    return(
      <div id = 'chart'></div>
    );
  }
}
export default GraphGoog;
