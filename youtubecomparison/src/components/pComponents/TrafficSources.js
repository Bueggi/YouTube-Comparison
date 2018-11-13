import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {updateTrafficSources} from '../../actions';

import ToolTips from './ToolTips';

class TrafficSources extends Component {


  render () {
    console.log('/////////////// TS', this.props.TrafficSources)
    // console.log('rendered Trafficsources', this.props.ownChannel_TS)
    return (
      <div id={this.counter} className="chart">
        <h1>{this.props.title}</h1>
        <Line
          data={this.props.trafficSources}
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
        {/* <ToolTips data={this.chartData} /> */}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  ownChannel_TS: state.entities.ownChannelData_TS,
  trafficSources: state.entities.trafficSources,
});

const mapDispatchToProps = (dispatch) => ({
  updateTrafficSources: (newData) => dispatch(updateTrafficSources(newData)),
});

export default connect(mapStateToProps)(TrafficSources);