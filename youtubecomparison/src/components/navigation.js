import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';


class Navigation extends Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <h1>Das ist die neue App</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.topics,
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);