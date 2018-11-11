import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';

class ChannelComparison extends Component {

  constructor (props) {
    super(props);
    this.state = {
      fetchedPL: null
    }
  }

  async componentDidMount () {
    try {
      this.fetchUploadPlaylistForAddedVideos();
    }
    catch (e) {
      throw new Error(e);
    }
  }

  componentDidUpdate () {
    try {
      this.fetchUploadPlaylistForAddedVideos();
    }
    catch (e) {
      throw new Error(e);
    }
  }


  fetchUploadPlaylistForAddedVideos = async () => {
    const channels = this.props.channelsToCompare;

    let updatedData = this.props.fetchedUploadLists;
    const channelToFetch = channels[channels.length-1];

    if (channelToFetch && !channelToFetch.videos) {
      let newChannel = await fetch(`https://www.googleapis.com/youtube/v3/channels?id=${channelToFetch}&part=snippet,contentDetails,statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&fields=items(id,snippet(title),contentDetails(relatedPlaylists(uploads)),statistics(subscriberCount))`)
        .then(res => res.json())
        .then(data => {
          return {
            id: data.items[0].id,
            title: data.items[0].snippet.title,
            uploads: data.items[0].contentDetails.relatedPlaylists.uploads,
            subscribers: data.items[0].statistics.subscriberCount
          };
        });

      newChannel.videos = [];
      const uploadPlaylist = newChannel.uploads;
      await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&playlistId=${uploadPlaylist}`)
        .then(res => res.json())
        .then(data => {
          data.items.forEach(video => {
            newChannel.videos.push(video.contentDetails.videoId)
            return newChannel
          });
        });

      const videosToFetch = newChannel.videos;

      await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&id=${videosToFetch.join()}&fields=items(id,snippet(channelTitle,title,thumbnails(medium(url)),tags),statistics)`)
        .then(res => res.json())
        .then(data => {
          newChannel.videoStats = [];
          data.items.forEach(video => {
            newChannel.videoStats.push(
              {
                id: video.id,
                channelTitle: video.snippet.channelTitle,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url,
                stats: video.statistics,
                tags: video.snippet.tags
              }
            );
          })
        });
        updatedData.push(newChannel)
      this.props.updateYouTubeChannelData(updatedData);
    }
  }

  render () {
    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  fetchedUploadLists: state.entities.fetchedUploadLists,
  fetchedVideoLists: state.entities.fetchedVideoLists
});

const mapDispatchToProps = (dispatch) => ({
  updateYouTubeChannelData: (data)=> dispatch(updateYouTubeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelComparison);
