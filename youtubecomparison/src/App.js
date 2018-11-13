import React, { Component } from 'react';
import Dashboard from './components/dashboard.js';
import { connect } from 'react-redux';
import { updateYouTubeData } from './actions';
import Searchbar from './components/Searchbar.js';
import Footer from './components/pComponents/footer'
import './App.css';
import VideoComparison from './components/videoComparison';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <Searchbar />
      </header>
      <main>
        <Dashboard />
        <VideoComparison />
      </main>
      <Footer />
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
