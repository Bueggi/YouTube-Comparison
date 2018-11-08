import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TrafficSources extends Component {

  constructor (props) {
    super(props);
    this.state = {
      chartData: {}
    }
  }

  chartColors = [
    'rgba(216, 164, 127, 0.1)',
    'rgba(223, 59, 87, 0.1)',
    'rgba(15, 113, 115, 0.1)',
    'rgba(124, 127, 101, 0.1)',
    'rgba(203, 111, 115, 0.1)',
    'rgba(203, 111, 115, 0.1)',
  ];

  borderColors = [
    'rgba(216, 164, 127, 1)',
    'rgba(223, 59, 87, 1)',
    'rgba(15, 113, 115, 1)',
    'rgba(124, 127, 101, 1)',
    'rgba(203, 111, 115, 1)',
  ];

  colorCounter = 0;

  datasToDisplay = [
    'YT_SEARCH',
    'RELATED_VIDEO',
    'PLAYLIST',
    'SUBSCRIBER',
    'END_SCREEN'
  ];

  dataToTrafficSource = (TSdata) => {
    const traversedData = TSdata.reduce((acc, date) => {
    if(acc.labels.indexOf(date[0]) === -1) acc.labels.push(date[0]);

    if (this.datasToDisplay.indexOf(date[1]) !== -1) {

      const dataset = acc.datasets.find(el => el.label === date[1])
      if (!dataset) {
        acc.datasets.push({
          label: date[1],
          data: [date[2]],
          backgroundColor: this.chartColors[this.colorCounter],
          borderColor: this.borderColors[this.colorCounter]
        })
        this.colorCounter++;
      }
      else dataset.data.push(date[2])
    }


    return acc;
  }, {
    labels: [],
    datasets: [],
  });

  console.log(traversedData);
  return traversedData;
  }

  componentWillMount () {
    this.setState({ chartData: this.dataToTrafficSource(this.props.data)});
    console.log('//// data I get as prop', this.props.data)
    console.log('//// chartData', this.state.chartData)
  }

  render () {


    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          height={100}
          options={{
            yAxes: [{
                stacked: true
            }]
          }}
        />
      </div>
    )
  }
}


export default TrafficSources;