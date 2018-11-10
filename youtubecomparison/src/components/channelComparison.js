import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';

class ChannelComparison extends Component {

  constructor (props) {
    super(props);
    this.state = {
      chartData: null
    }
  }

  async componentDidUpdate () {
    console.log('ChannelComparison wurde aufgerufen')
    await this.fetchUploadPlaylistForAddedVideos();
    await this.fetchFiveLatestVideosFromChannelUploads();
    await this.fetchVideoStatisticsfromSingleVideos();
  }

  fetchUploadPlaylistForAddedVideos = () => {
    const newChannelData = this.props.dataFromYouTubeChannels;
    this.props.channelsToCompare.map(async channel =>
      {
        if (!newChannelData[channel]) {
        return await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${channel}&part=snippet,contentDetails&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&fields=items(id,snippet(title),contentDetails(relatedPlaylists(uploads)))`)
          .then((data) => data.json())
          .then(data => {
            newChannelData[channel] = {
              title: data.items[0].snippet.title,
              uploads: data.items[0].contentDetails.relatedPlaylists.uploads
            };
            this.props.updateYouTubeChannelData(newChannelData);
          })
        }
      }
    )

  }

  fetchFiveLatestVideosFromChannelUploads = () => {
    let newChannelData = this.props.dataFromYouTubeChannels;
    Object.keys(newChannelData).forEach(async channel => {
      let newItem = newChannelData[channel];
      console.log(newItem, newItem.videos)
      if (!newItem.videos) {
       return await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&playlistId=${newItem.uploads}`)
        .then(data => data.json())
        .then(data => data.items.map(el => {
          if (!newItem.videos) newItem.videos = {};
          return newItem.videos[el.contentDetails.videoId] = {};
        }))
        .then(data => newChannelData[channel] = newItem)
      }
      this.props.updateYouTubeChannelData(newChannelData)
     });
  }

  fetchVideoStatisticsfromSingleVideos = async () => {
    const newChannelData = this.props.dataFromYouTubeChannels
    Object.keys(newChannelData).map(el => {
      Object.keys(el.videos).map(async video => {
        if (video === {}) {
          return await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&id=${video}&fields=items(id,snippet(title,thumbnails(medium(url)),tags),statistics`)
            .then(res => res.json())
            .then(data => console.log(data))
        }
      })
    })
  }

  render () {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  dataFromYouTubeChannels: state.entities.dataFromYouTubeChannels
});

const mapDispatchToProps = (dispatch) => ({
  updateYouTubeChannelData: (data)=> dispatch(updateYouTubeData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelComparison);

// https://www.googleapis.com/youtube/v3/channels?id=UC2Yo5HbL-A7uoYvcl7pl7Jg&part=snippet,contentDetails&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&fields=items(id,snippet(title),contentDetails(relatedPlaylists(uploads)))
// https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&playlistId=UU2Yo5HbL-A7uoYvcl7pl7Jg
// https://www.googleapis.com/youtube/v3/videos?part=snippet, statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&id=Q4jKBebtOP8&fields=items(id,snippet(title,thumbnails(medium(url)),tags),statistics)