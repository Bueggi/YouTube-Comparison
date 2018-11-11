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

  // async componentDidMount () {
  //   console.log('ChannelComparison wurde aufgerufen')
  //   await this.fetchUploadPlaylistForAddedVideos();
  //   // await this.fetchFiveLatestVideosFromChannelUploads();
  //   // await this.fetchVideoStatisticsfromSingleVideos();
  // }

  componentDidUpdate () {
    try {
      this.fetchUploadPlaylistForAddedVideos();
      // this.fetchFiveLatestVideosFromChannelUploads();
      // this.fetchVideoStatisticsfromSingleVideos();
    }
    catch (e) {
      throw new Error(e);
    }
    // await this.fetchVideoStatisticsfromSingleVideos();
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
      console.log('////// VIDEOS TO FETCH', newChannel ,videosToFetch, videosToFetch.join());

      await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&id=${videosToFetch.join()}&fields=items(id,snippet(title,thumbnails(medium(url)),tags),statistics)`)
        .then(res => res.json())
        .then(data => {
          newChannel.videoStats = [];
          console.log('////////// DATATHAT GETS PUSHED', data)
          data.items.forEach(video => {
            newChannel.videoStats.push(
              {
                id: video.id,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url,
                stats: video.snippet.statistics,
                tags: video.snippet.tags
              }
            );
          })
        });

        updatedData.push(newChannel)
      this.props.updateYouTubeChannelData(updatedData);
    }
  }

  // fetchFiveLatestVideosFromChannelUploads = async () => {
  //   const newData = this.props.fetchedUploadLists;
  //   const channelToCheck = newData[newData.length - 1];

  //   if (channelToCheck && !channelToCheck.videos) {
  //     channelToCheck.videos = [];
  //     const uploadPlaylist = channelToCheck.uploads;
  //     await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&playlistId=${uploadPlaylist}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         data.items.forEach(video => {
  //           channelToCheck.videos.push(video.contentDetails.videoId)
  //         });
  //       });

  //     newData.pop();
  //     newData.push(channelToCheck);
  //     this.props.updateYouTubeChannelData(newData);
  //   }
  // }


  fetchVideoStatisticsfromSingleVideos = async () => {
    const newData = this.props.fetchedUploadLists;
    const channelToCheck = newData[newData.length -1]
    if (channelToCheck && !channelToCheck.videoStats) {
      const videosToFetch = channelToCheck.videos;
      console.log('////// CHANNEL', channelToCheck, channelToCheck.videos)
      console.log('////// VIDEOS TO FETCH', videosToFetch)
      await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&id=${videosToFetch.join()}&fields=items(id,snippet(title,thumbnails(medium(url)),tags),statistics)`)
        .then(res => res.json())
        .then(data => {
          channelToCheck.videoStats = [];
          console.log('////////// WHAT????', data)
          data.items.forEach(video => {
            channelToCheck.videoStats.push(
              {
                id: video.id,
                title: video.snippet.title,
                thumbnail: video.snippet.thumbnails.medium.url,
                stats: video.snippet.statistics,
                tags: video.snippet.tags
              }
            );
          })
        });
        newData.pop();
        newData.push(channelToCheck);
        this.props.updateYouTubeChannelData(newData);
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
