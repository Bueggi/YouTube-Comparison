import React, { Component } from 'react';
import '../css/welcomePage.css';

class ToolTips extends Component {


  render () {
    console.log(this.props.data)
    return (
      <React.Fragment>
      <div className="row">
        <div class="col l3 s12 card blue-grey darken-1">
        <div class="card-content white-text">
          <p>{this.props.data}</p>
        </div>
        </div>
      </div>


      </React.Fragment>
    );
  }
}


export default (ToolTips);