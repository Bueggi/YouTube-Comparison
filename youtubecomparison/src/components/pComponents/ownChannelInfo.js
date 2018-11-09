import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, addChannelToWatch, setOwnTrafficSources } from '../../actions';
import TrafficSources from './trafficSourcesComponent';
import moment from 'moment';


class OwnChannelInfo extends Component {

  today = moment().format('YYYY-MM-DD');
  last28days = moment().subtract(28, 'days').format('YYYY-MM-DD');

  componentDidMount () {
    this.fetchChannelStatistics();
    if (!this.props.ownChannel_TS)
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData = async() => {
      await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day,insightTrafficSourceType&ids=channel==MINE&metrics=views&sort=day&endDate=${this.last28days}&startDate=${this.today}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(data => data.json())
        .then(data => this.props.setOwnTrafficSources(data.rows))
  }

  fetchChannelStatistics = async () => {
    await fetch(`https://youtubeanalytics.googleapis.com/v2/reports?ids=channel==MINE&dimensions=day&isCurated==1&metrics=views,comments,likes,dislikes,estimatedMinutesWatched,averageViewDuration&startDate=${this.last28days}&endDate=${this.today}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(data => data.json())
        .then(data => console.log('///channelData', data))
  }


  render () {
    if (this.props.ownChannel_TS) {
      return (
        <div className="row">
          Hallo, schau mal in die Console
          <TrafficSources data={this.props.ownChannel_TS} />

        </div>
      )
    }
    else return null;
  }

}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  signedInUser: state.user.signedInUser,
  ownChannel_TS: state.entities.ownChannelData_TS
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
  addChannelToWatch: (channelId) => dispatch(addChannelToWatch(channelId)),
  setOwnTrafficSources: (data) => dispatch(setOwnTrafficSources(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnChannelInfo);



// 30 day totals / 7 day totals

// views, estimatedMinutesWatched
// averageViewDuration

// likes
// dislikes
// insightTrafficSourceType - views, day

// Top Video
// videointelligence,views,likes, dislikes,

// TrafficSources
// insightTrafficSourceType, day, views, isCurated==1