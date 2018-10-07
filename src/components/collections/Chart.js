import React, { Component } from 'react';
import {Line, Bar} from 'react-chartjs-2';
// import { connect } from ''

import juneJSON from '../../data/2018-06.json'


class Chart extends Component {
  render() {
    const json = this.props.data;
    const data = {

  //    Bug in React-chartjs-2 forces label to be put in XAxis
  //    labels: json.map(x => x['date']),
      datasets: [{
        label: 'Steps',
        type: 'bar',
        data: json.map(x => x['count']),
        fill: false,
        backgroundColor: '#e7aae1',
        borderColor: '#c584d7',
        hoverBackgroundColor: '#010515',
        hoverBorderColor: '#71B37C',
        yAxisID: 'y-axis-1',
        lineTension: 0.4

    },{
      label: 'Calories',
      type: 'bar',
      data: json.map(x => x['calorie']),
      fill: true,
      backgroundColor: '#010515',
      borderColor: '#c584d7',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'

    },{
      label: 'Distance',
      type:'line',
      data: json.map(x => x['distance']),
      fill: false,
      borderColor: '#c584d7',
      backgroundColor: '#010515',
      pointBorderColor: '#c584d7',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    },

  ]};

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          },
          labels: json.map(x => x['date'][10]),
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };

  const plugins = [{
      afterDraw: (chartInstance, easing) => {
          const ctx = chartInstance.chart.ctx;
          ctx.fillText("Dassha", 100, 100);
      }
  }];

    return (
      <div>
        <Bar
          data={data}
          options={options}
          plugins={plugins}
        />
      </div>
    );
  }
}

export default Chart;
