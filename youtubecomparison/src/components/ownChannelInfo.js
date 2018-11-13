import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, addChannelToWatch, setOwnTrafficSources, setOwnChannelStats, updateTrafficSources } from '../actions';
import moment from 'moment';
import TrafficSources from './pComponents/TrafficSources';
import ChannelStatistics from './pComponents/ChannelStatistics';

import 'react-day-picker/lib/style.css'
import './css/ownChannelInfo.css';

class OwnChannelInfo extends Component {

  constructor (props) {
    super(props);
    this.state = {
      endDate: moment().format('YYYY-MM-DD'),
      startDate: moment().subtract(28, 'days').format('YYYY-MM-DD')
    }
  }

  DATA_TO_DISPLAY = [
    'YT_SEARCH',
    'RELATED_VIDEO',
    'PLAYLIST',
    'SUBSCRIBER',
    'END_SCREEN'
  ];

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

  colorCounter = 0;

  componentDidMount () {
    try {
      if (!this.props.ownChannel_Views || this.props.ownChannel_TS) {
        this.fetchChannelStatistics();
        this.fetchAnalyticsData();
      }
    }
    catch (e) {
      throw new Error(e);
    }
  }

  componentDidUpdate () {
    console.log(this.state.startDate, this.props.startDate, this.state.startDate === this.props.startDate)

    if (this.state.endDate !== this.props.endDate || this.state.startDate !== this.props.startDate) {
      try {
        console.log('came here');
        this.fetchChannelStatistics();
        this.fetchAnalyticsData();
      }
      catch (e) {
        throw new Error(e);
      }
      this.setState({
        startDate: this.props.startDate,
        endDate: this.props.endDate
      });
    }
  }

// functions to fetch and transform data for chart 'Traffic Sources'
  dataToTrafficSource = (rawData) => {
    console.log(rawData);
    this.colorCounter = 0;
    rawData = rawData.filter(el => this.DATA_TO_DISPLAY.indexOf(el[1]) !== -1)

    const traversedData = rawData.reduce((acc, date) => {
      if(acc.labels.indexOf(date[0]) === -1) acc.labels.push(date[0]);


      const dataset = acc.datasets.find(el => el.label === date[1])
      if (!dataset) {
        acc.datasets.push({
          label: date[1],
          data: [date[2]],
          backgroundColor: this.CHART_COLORS[this.colorCounter],
          borderColor: this.BORDER_COLORS[this.colorCounter]
        })
      }
      else dataset.data.push(date[2])
      this.colorCounter++;
      return acc;
    }, {
      labels: [],
      datasets: []
    });
  return traversedData;
  }

  fetchAnalyticsData = async() => {
      await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day,insightTrafficSourceType&ids=channel==MINE&metrics=views&sort=day&endDate=${this.props.endDate}&startDate=${this.props.startDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(data => data.json())
        .then(data => this.dataToTrafficSource(data.rows))
        .then(data => this.props.updateTrafficSources(data))
  }

  dataToStatistics = (headers, rows) => {
    this.colorCounter = 0;
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

  fetchChannelStatistics = async () => {
    await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&dimensions=day&isCurated==1&metrics=views,comments,likes,dislikes,estimatedMinutesWatched,averageViewDuration&startDate=${this.props.startDate}&endDate=${this.props.endDate}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(data => data.json())
        .then(data => this.dataToStatistics(data.columnHeaders, data.rows))
        .then(data => this.props.setOwnChannelStats(data))
  }

  // ======= RENDERING CHANNELINFO COMPONENT =====
  render () {
    if (this.props.trafficSources && this.props.ownChannel_Views) {
      return (
        <div className="chart_row">

          <TrafficSources
          data={this.props.ownChannel_TS}
          dataToDisplay={[
            'YT_SEARCH',
            'RELATED_VIDEO',
            'PLAYLIST',
            'SUBSCRIBER',
            'END_SCREEN'
          ]}
          title='Traffic Sources'/>

          <ChannelStatistics
          title='Views and Watchtime'/>
        </div>
      )
    }
    else return null;
  }

}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  signedInUser: state.user.signedInUser,
  ownChannel_TS: state.entities.ownChannelData_TS,
  ownChannel_Views: state.entities.ownChannelData_Views,
  startDate: state.entities.startDate,
  endDate: state.entities.endDate,
  trafficSources: state.entities.trafficSources
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
  updateTrafficSources: (newData) => dispatch(updateTrafficSources(newData)),
  addChannelToWatch: (channelId) => dispatch(addChannelToWatch(channelId)),
  setOwnTrafficSources: (data) => dispatch(setOwnTrafficSources(data)),
  setOwnChannelStats: (data) => dispatch(setOwnChannelStats(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnChannelInfo);