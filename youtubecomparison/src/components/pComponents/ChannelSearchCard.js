import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, addChannelToWatch } from '../../actions';

class ChannelSearch extends Component {
  handleClick (e) {
    console.log(e.target)
  }

  render () {
    if(this.props.id)
    {
      console.log('been here as well')
      return (
      <div className="col s12 m3">
        <div className="card large">
          <div className="card-image">
            <img alt="Blablabal" src={this.props.thumbnail} />
          </div>
          <div className="card-content">
            <h3>{this.props.title}</h3>
          </div>
          <div className="card-action">
            <a href="#" onClick={() => this.props.addChannelToWatch(this.props.id)}>Add To Comparison</a>
          </div>
        </div>
      </div>
      )
    }
    else return '';
  }

}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
  addChannelToWatch: (channelId) => dispatch(addChannelToWatch(channelId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSearch);