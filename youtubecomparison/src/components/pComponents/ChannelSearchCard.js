import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../../actions';

class ChannelSearch extends Component {
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
            <a href="#" onClick={this.handleClick}>Add To Comparison</a>
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
  updateData: (newData) => dispatch(updateYouTubeData(newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSearch);