import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import ToolTips from './ToolTips';

class TrafficSources extends Component {

  constructor (props) {
    super(props);
    this.state = {
      chartData: {}
    }
  }

  componentWillMount () {
    this.setState({ chartData: this.dataToTrafficSource(this.props.data)});
  }

  colorCounter = 0;

  CHART_COLORS = [
    'rgba(216, 164, 127, 0.1)',
    'rgba(223, 59, 87, 0.1)',
    'rgba(15, 113, 115, 0.1)',
    'rgba(124, 127, 101, 0.1)',
    'rgba(203, 111, 115, 0.1)',
    'rgba(203, 111, 115, 0.1)',
  ];

  BORDER_COLORS = [
    'rgba(216, 164, 127, 1)',
    'rgba(223, 59, 87, 1)',
    'rgba(15, 113, 115, 1)',
    'rgba(124, 127, 101, 1)',
    'rgba(203, 111, 115, 1)',
  ];

  DATA_TO_DISPLAY = this.props.dataToDisplay;

  dataToTrafficSource = (rawData) => {
    const traversedData = rawData.reduce((acc, date) => {
    if(acc.labels.indexOf(date[0]) === -1) acc.labels.push(date[0]);

    if (this.DATA_TO_DISPLAY.indexOf(date[1]) !== -1) {
      const dataset = acc.datasets.find(el => el.label === date[1])
      if (!dataset) {
        acc.datasets.push({
          label: date[1],
          data: [date[2]],
          backgroundColor: this.CHART_COLORS[this.colorCounter],
          borderColor: this.BORDER_COLORS[this.colorCounter]
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

  return traversedData;
  }


  render () {


    return (
      <div className="chart">
        <h1>{this.props.title}</h1>
        <Line
          data={this.state.chartData}
          height={100}
          options={{
            legend: {
              position: 'top',
            },
            yAxes: [{
                stacked: true
            }]
          }}
        />
        <ToolTips data={this.props.data} />
      </div>
    )
  }
}


export default TrafficSources;