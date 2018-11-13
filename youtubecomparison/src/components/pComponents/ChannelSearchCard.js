import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, addChannelToWatch } from '../../actions';

import '../css/channelSearchCard.css'

class ChannelSearch extends Component {

  render () {
    if(this.props.id)
    {
      console.log(this.props.id)
      return (
      <div className="col s12 m3" width="100%">
        <div className="card large">
          <div className="card-image">
            <img alt="Thumbnail of a channel" src={this.props.thumbnail} />
          </div>
          <div className="card-content">
            <h3 className="searchCardTitle">{this.props.title}</h3>
          </div>
          <div className="card-action">
            { this.props.signedInUser ?
              <button className="waves-effect waves-light btn" onClick={() => {this.props.addChannelToWatch(this.props.id); this.props.clearData() } }><i className="material-icons right">add_box</i>Add Channel</button>
              :
              <button className="btn disabled">Sign in to compare</button>
            }
          </div>
        </div>
      </div>
      )
    }
    else return null;
  }

}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  signedInUser: state.user.signedInUser
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
  addChannelToWatch: (channelId) => dispatch(addChannelToWatch(channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSearch);