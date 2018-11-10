import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, userLogIn, userLogOut } from '../actions';
import OwnChannelInfo from './pComponents/ownChannelInfo';
import GoogleLogin from 'react-google-login';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import WelcomePage from './pComponents/welcomePage'

import './css/ownChannelInfo.css'

const serverHost = 'http://localhost:3001';


class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      signedIn : false
    };
    this.signedInUser = null;
  }

  // callback function for the GoogleAPI call
  // sends a request to google and stores the received accessToken in the local Storage
  responseGoogle = async response => {
    this.props.userLogIn(response.profileObj);

    await fetch(`${serverHost}/auth/google`, {
      method: 'POST',
      body: JSON.stringify(response),
      headers: new Headers({
       'Content-Type': 'application/json'
     })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('accessToken', data.accessToken);
        this.logInUser();
        this.login();
      });
  };

  logInUser = () => {
    this.setState({signedIn: true});
  }

  login = async () => {
    if (localStorage.getItem('accessToken')) {

      await fetch(`${serverHost}/login`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
        .then(res => {if (res.status === 200) return res.json();})
        .then(data => {
          if (data) {
            console.log('////// data from loginFunction', data);
          }
        });
    }
  };

  logInOrLogOut = () => {
    if (this.state.signedIn)
      {
        return (
        <div className="row">
            <div className="l4 s12">
            <h2>You're logged in: {this.props.signedInUser.name}</h2>
            <img src={this.props.signedInUser.imageUrl} alt="User profile pic" className="circle"/>
          </div>
        </div>
          )
      }
      else {
        return (
          <div>
            <h1>Compare YouTube-Channels</h1>
            <h2>Make your channel grow bigger than your ego!</h2>

            <GoogleLogin
            clientId="314239737420-gjdh038nnos438r8cv04gi96nsie58n2.apps.googleusercontent.com"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            className="waves-effect waves-light btn-large"
            buttontext="Sign in with YouTube"
            scope={'https://www.googleapis.com/auth/youtube.readonly'} />

          </div>
        )
      }
    }

  render () {
    return (
      <div>
        <div className='header'>
          {this.logInOrLogOut()}
        </div>

        <div className="channelInfo">
          {
            this.state.signedIn ? <OwnChannelInfo /> : <WelcomePage />
          }
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  signedInUser: state.user.signedInUser
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
  userLogIn: (user) => dispatch(userLogIn(user)),
  userLogOut: () => dispatch(userLogOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);