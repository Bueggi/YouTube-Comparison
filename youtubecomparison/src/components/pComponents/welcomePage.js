import React, { Component } from 'react';
import '../css/welcomePage.css';

class WelcomePage extends Component {

  render () {
    return (
      <div className="row section flex">
        <div className="col l4 s12">
          <img src='./images/graph.png' alt="Graph" className="responsive-img" width="60%"/>
          <h3>Make your channel grow fast</h3>
          <p>Based on experience, powered by data. Trust 3 years of experience as a YouTube consultant and 1 week as a developer to lead you to a great carreer.</p>
        </div>
        <div className="col l4 s12">
          <img src='./images/customer-review.png' alt="Graph" className="responsive-img" width="60%"/>
          <h3>You are the next YT-Star!</h3>
          <p>You, yes, you could become the next Casey Neistad. At least Nyan Cat. Just don't film yourself playing Unreal Tournament.</p>
        </div>
        <div className="col l4 s12">
          <img src='./images/comparative.png' alt="Graph" className="responsive-img" width="60%" />
          <h3>Compare Yourself to Success!</h3>
          <p>Anyone said: "Just be yourself - don't compare yourself to others? They. Were. Wrong! Take care and compare.</p>
        </div>

      </div>
    );
  }
}

export default (WelcomePage);