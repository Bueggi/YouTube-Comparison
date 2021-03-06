import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, userLogIn, userLogOut } from '../actions';
import OwnDataTable from './pComponents/ownDataTable';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import DatePicker from './pComponents/DatePicker';

import './css/videoComparison.css';
const serverHost = 'http://localhost:3001';

class Header extends Component {

  constructor (props) {
    super(props);
    this.state = {
      signedIn: false
    }
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

  logout = () => {
    localStorage.removeItem('accessToken');
    this.props.userLogOut();
  }

  render () {
    if (this.state.signedIn)
      {
        return (
          <div className='row'>
            <div className="l10 s12">
              <div>
                <div className="flex">
                  <img src={this.props.signedInUser.imageUrl} alt="User profile pic" className="circle flex-1 header_profile"/>
                  <h2 className="flex-4">You're logged in: {this.props.signedInUser.name}</h2>
                </div>
                {/* <OwnDataTable /> */}
                <DatePicker />
            </div>
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
  }

  const mapStateToProps = (state) => ({
    channelsToCompare: state.entities.channelsToCompare,
    signedInUser: state.user.signedInUser,
    ownChannel_Views: state.entities.ownChannelData_Views,
    startDate: state.entities.startDate,
    endDate: state.entities.endDate
  });

  const mapDispatchToProps = (dispatch) => ({
    updateData: (newData) => dispatch(updateYouTubeData(newData)),
    userLogIn: (user) => dispatch(userLogIn(user)),
    userLogOut: () => dispatch(userLogOut())
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Header);