import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/videoComparison.css'
import { updateYouTubeData, removeChannelFromWatchList } from '../actions';
import './css/videoComparison.css'

class VideoComparison extends Component {

  constructor (props) {
    super(props);
    this.state = {
      channelData: []
    }
  }

  componentDidUpdate () {
    try {
      this.fetchUploadPlaylistForAddedVideos()
    }
    catch (e) {
      throw new Error(e);
    }
  }

  componentWillUpdate () {
    try {
      this.fetchUploadPlaylistForAddedVideos()
    }
    catch (e) {
      throw new Error(e);
    }
  }

  componentDidMount () {
    try {
      this.fetchUploadPlaylistForAddedVideos()
    }
    catch (e) {
      throw new Error(e);
    }
  }

  fetchUploadPlaylistForAddedVideos = async () => {
    console.log('got updated', this.props.channelsToCompare)
    const channels = this.props.channelsToCompare;
    let updatedData = this.props.fetchedUploadLists;
    const channelToFetch = channels[channels.length-1];

    console.log(updatedData, channelToFetch)

    if ((channels.length !== updatedData.length) && channelToFetch && !channelToFetch.videostats) {
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

      await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&id=${videosToFetch.join()}&fields=items(id,snippet(channelId,channelTitle,title,thumbnails(medium(url)),tags),statistics)`)
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
              tags: video.snippet.tags,
              channelId: video.snippet.channelId
            }
            );
          })
        });

        updatedData.push(newChannel);

        this.setState({channelData : updatedData})
        this.props.updateYouTubeData(updatedData)
    }
  }

  render () {
    if (this.state.channelData.length > 0) {

      return (
        <div className='row container'>
          <h1>Video Comparison</h1>
            <table className="videotable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Views</th>
                  <th>Likes</th>
                  <th>Dislikes</th>
                  <th>Comments</th>
              </tr>
            </thead>

            <tbody>
              {this.state.channelData.map(videoList => {
                return videoList.videoStats.map((video, i) => {
                  return (
                    <tr key={video.id}>
                          <td>{video.title}</td>
                          <td>{video.stats.viewCount}</td>
                          <td>{video.stats.likeCount}</td>
                          <td>{video.stats.dislikeCount}</td>
                          <td>{video.stats.commentCount}</td>
                    </tr>
                  )
                })
              })}
            </tbody>
          </table>

          <div>
            { this.state.channelData.map(videoList => {
            return videoList.videoStats.map((video, i) => {
              return (
                <div key={`${video.id}${i}`} className='col l4 s12'>
                  <div className="card">
                    <div className="card-image waves-effect waves-block waves-light">
                     <img className="activator" alt="Thumbnail of selected video" src={video.thumbnail} />
                    </div>

                    <div className="card-content">
                     <span className="card-title activator grey-text text-darken-4">{video.title.slice(0,20)}...<i className="material-icons right">more_vert</i></span>
                      <button className='btn' onClick={()=>{this.props.removeChannelFromWatchList(video.channelId)}}>Remove {video.channelTitle} from comparison</button>
                    </div>

                    <div className="card-reveal">
                     <span className="card-title grey-text text-darken-4">{video.title}<i className="material-icons right">close</i></span>
                      <p>Views: {video.stats.viewCount}</p>
                      <p>Likes: {video.stats.likeCount}</p>
                      <p>Dislikes: {video.stats.dislikeCount}</p>
                      <p>Comments: {video.stats.commentCount}</p>
                      <div>Tags:{video.tags ? video.tags.map((tag, i) => <div id={tag+i} className="chip">{tag}</div>) : <p>No tags on this video</p>}</div>
                    </div>
                  </div>
                </div>
                )
              })
            })
          }
        </div>
      </div>
      )
    }
    else return null;
  }
}

const mapStateToProps = (state) => ({
  fetchedUploadLists: state.entities.fetchedUploadLists,
  channelsToCompare: state.entities.channelsToCompare
});

const mapDispatchToProps = (dispatch) => ({
  updateYouTubeData: (newData) => dispatch(updateYouTubeData(newData)),
  removeChannelFromWatchList: (id) => dispatch(removeChannelFromWatchList(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoComparison);
