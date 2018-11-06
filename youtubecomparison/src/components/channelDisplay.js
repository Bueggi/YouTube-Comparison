import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';


class ChannelDisplay extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <h2>Jo, hier steht auch was</h2>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.topics,
});

const mapDispatchToProps = (dispatch) => ({
  updateYouTubeData: (newData) => dispatch(updateYouTubeData(newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDisplay);