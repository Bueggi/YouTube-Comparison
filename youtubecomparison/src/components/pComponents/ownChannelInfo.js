import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, addChannelToWatch, setOwnTrafficSources } from '../../actions';
import TrafficSources from './trafficSourcesComponent';


class OwnChannelInfo extends Component {

  componentDidMount () {
    console.log(this.props.ownChannel_TS)
    if (!this.props.ownChannel_TS)
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData = async() => {
      await fetch('https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day,insightTrafficSourceType&ids=channel==MINE&metrics=views&sort=day&endDate=2018-04-05&startDate=2018-04-01',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })
        .then(data => data.json())
        .then(data => this.props.setOwnTrafficSources(data.rows))
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