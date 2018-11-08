import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class TrafficSources extends Component {

  constructor (props) {
    super(props);
    this.state = {
      chartData: {}
    }
  }

  dataToTrafficSource = (TSdata) => {
    const traversedData = TSdata.reduce((acc, date) => {
    if(acc.labels.indexOf(date[0]) === -1) acc.labels.push(date[0]);

    const dataset = acc.datasets.find(el => el.label === date[1])
    if (!dataset) {
      acc.datasets.push({
        label: date[1],
        data: [date[2]]
      })
    }
    else dataset.data.push(date[2])

    return acc;
  }, {
    labels: [],
    datasets: []
  });

  return traversedData;
  }

  componentWillMount () {
    this.dataToTrafficSource(this.props.data);
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