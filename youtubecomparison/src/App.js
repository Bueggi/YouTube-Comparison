import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <button className="authorize-button">LogIn with YouTube</button>
        <button className="LogOut-button">LogOut with YouTube</button>

      </div>
    );
  }
}

export default App;
