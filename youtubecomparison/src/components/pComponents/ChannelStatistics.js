import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class ChannelStatistics extends Component {

  constructor (props) {
    super(props);
    this.state = {
      chartData: null
    }
  }

  componentDidMount () {
    this.setState({
      chartData: this.dataToStatistics(this.props.data.columnHeaders, this.props.data.rows)
    });
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

  dataToStatistics = (headers, rows) => {
    const result = {
      labels: [],
      datasets: []
    }

    headers.map(el =>
      {
        result.datasets.push({
        label: el.name,
        data: [],
        backgroundColor: this.CHART_COLORS[this.colorCounter],
        borderColor: this.BORDER_COLORS[this.colorCounter]
      })
      this.colorCounter++;
      return result
      }
    )

    rows.map(el => {
      result.labels.push(el[0]);

      el.map((el, i) => {
        result.datasets[i].data.push(el);
      });
    });

    return result;
  }

  viewsAndMinutesFilter = (data) => {
    if (this.state.chartData) {
      let chartData = this.state.chartData;
      console.log(chartData)
      console.log(this.state.chartData)
      const filteredDatasets = data.datasets.filter(el => el.label === 'views' || el.label === 'estimatedMinutesWatched' )
      chartData.datasets = filteredDatasets;
      return chartData;
    }
  }


  render () {
    return (
      <div className="chart">
        <h1>{this.props.title}</h1>
        <Line
          data={this.viewsAndMinutesFilter(this.state.chartData)}
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
      </div>
    )
  }
}


export default ChannelStatistics;