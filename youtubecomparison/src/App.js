import React, { Component } from 'react';
import Navigation from './components/navigation.js';
import ChannelDisplay from './components/channelDisplay.js';
import { connect } from 'react-redux';
import { updateYouTubeData } from './actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navigation />
      <ChannelDisplay />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.entities.events
})

const mapDispatchToProps = (dispatch) => ({
  updateData: (channels) => dispatch(updateYouTubeData(channels))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
