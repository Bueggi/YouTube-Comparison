import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/videoComparison.css'

class VideoComparison extends Component {

  componentWillUpdate () {
    console.log('VideoComparison did update');
  }

  render () {

    return (
      <div className='row container'>
        {this.props.fetchedUploadLists && this.props.fetchedUploadLists.length > 0 ?
        <div>
          <h1>ChannelComparison</h1>
          { this.props.fetchedUploadLists.map(videoList => {
          return videoList.videoStats.map((video, i) => {
            return (
              <div key={`${video.id}${i}`} className='col l4 s12'>
              <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" alt="Thumbnail of selected video" src={video.thumbnail} />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{video.title.slice(0,20)}...<i className="material-icons right">more_vert</i></span>
                  <p><button className='btn'>Remove {video.channelTitle} from comparison</button></p>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{video.title}<i className="material-icons right">close</i></span>
                  <p>Views: {video.stats.viewCount}</p>
                  <p>Likes: {video.stats.likeCount}</p>
                  <p>Dislikes: {video.stats.dislikeCount}</p>
                  <p>Comments: {video.stats.commentCount}</p>
                  { video.tags && video.tags.length > 0 ? <p>Tags: {video.tags.map(tag => <div className="chip">{tag}</div>)}</p>
                    : null }
                </div>
              </div>
              </div>
              )
            })
          })
        }
          </div>
          : null
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  fetchedUploadLists: state.entities.fetchedUploadLists,
  channelsToCompare: state.entities.channelsToCompare
});

export default connect(mapStateToProps)(VideoComparison);
