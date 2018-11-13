import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

class ChannelStatistics extends Component {

  viewsAndMinutesFilter = (data) => {
    if (data) {
      const filteredDatasets = data.datasets.filter(el => el.label === 'views' || el.label === 'estimatedMinutesWatched' )
      data.datasets = filteredDatasets;
      return data;
    }
  }


  render () {
    return (
      <div className="chart">
        <h1>{this.props.title}</h1>
        <Line
          data={this.viewsAndMinutesFilter(this.props.ownChannel_Views)}
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


const mapStateToProps = (state) => ({
  ownChannel_Views: state.entities.ownChannelData_Views,
});

export default connect(mapStateToProps)(ChannelStatistics);