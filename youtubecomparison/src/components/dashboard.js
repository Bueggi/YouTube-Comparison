import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, userLogIn, userLogOut } from '../actions';
import OwnChannelInfo from './ownChannelInfo';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import WelcomePage from './pComponents/welcomePage'

import './css/ownChannelInfo.css'
import VideoComparison from './videoComparison';
import Header from './Header';


class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      signedIn : false,
      ownChannelViews: {},

    };
    this.signedInUser = null;
  }

  render () {
    return (
      <div>
        <div className='header'>
          <Header />
        </div>

        <div className="channelInfo">
          {
            this.props.signedInUser ?
            <div>
              <div className="container">
                <OwnChannelInfo />
              </div>
            </div>
            : <WelcomePage />
          }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  signedInUser: state.user.signedInUser,
  ownChannel_Views: state.entities.ownChannelData_Views
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
  userLogIn: (user) => dispatch(userLogIn(user)),
  userLogOut: () => dispatch(userLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);