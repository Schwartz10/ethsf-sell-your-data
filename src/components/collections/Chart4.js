import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { timeParse } from 'd3-time-format';
import { tsvParse } from 'd3-dsv';

import mayTsv from '../../data/2018-05'
import juneTsv from '../../data/2018-06'
import julyTsv from '../../data/2018-07'
import augustTsv from '../../data/2018-08'
import septemberTsv from '../../data/2018-09'
import octoberTsv from '../../data/2018-10'
import juneJSON from '../../data/2018-06.json'


class Chart extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const json = juneJSON;



    const stepData = {
      labels: json.map(x => x['date']),
      datasets: [
        {
          label: 'Steps',
          fill: true,
          lineTension: 0.0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: json.map(x => x['count'])
        }
      ]
    };

    const distanceData = {
      labels: json.map(x => x['date']),
      datasets: [
        {
          label: 'Distance',
          fill: false,
          lineTension: 0.0,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: json.map(x => x['distance'])
        }
      ]
    };

    const calorieData = {
      labels: json.map(x => x['date']),
      datasets: [
        {
          label: 'Calories',
          fill: false,
          lineTension: 0.0,
          backgroundColor: 'rgba(5, 5, 5, 0.5)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.1,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: json.map(x => x['calorie'])
        }
      ]
    };

    return (
      <div>
        <Line data={stepData}/>
        <Line data={distanceData} />
        <Line data={calorieData} />
      </div>
    );
  }
}

export default Chart;
