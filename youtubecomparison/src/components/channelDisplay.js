import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, addChannelToWatch } from '../actions';


class ChannelDisplay extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <ul>
        <p>{this.props.channelsToCompare.map((el, i) => {
          return <li key='i'>{el}</li>
        })
        }</p>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
});

const mapDispatchToProps = (dispatch) => ({
  updateYouTubeData: (newData) => dispatch(updateYouTubeData(newData)),
  addChannelToWatch: (channelID) => dispatch(addChannelToWatch(channelID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDisplay);