import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData, userLogIn, userLogOut } from '../actions';
import ChannelSearchCard from './pComponents/ChannelSearchCard';
import OwnChannelInfo from './pComponents/ownChannelInfo';
import GoogleLogin from 'react-google-login';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import moment from 'moment';

const serverHost = 'http://localhost:3001';


class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchInput: '',
      signedIn : false
    };

    this.searchCards = [];
    this.signedInUser = null;
  }


  showChannelsDebounced = AwesomeDebouncePromise(this.showChannels, 500);

  // callback function for the GoogleAPI call
  // sends a
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

  updateLocalStorage = (data, userList) => {
    let localData = localStorage.getItem(userList).split(',');
    data.forEach(str => {
      localData.push(str);
    });
    let newData = localData.join(',');
    localStorage.setItem(userList, newData);
  };

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


  onSearchInput = (e) => {
    const value = e.target.value;
    this.setState({searchInput: value});
    if (value === '') {
      this.searchCards = []
    }
    else {
      this.showChannels(value)
    }
  }

  showChannels = async (channelToSearchFor) => {
    await fetch(`https://www.googleapis.com/youtube/v3/search?type=channel&q=${channelToSearchFor}&part=snippet&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&maxResults=4`)
    .then(data => data.json())
    .then(data => {
      this.searchCards = [];
      for (let item in data.items) {
        this.searchCards.push(data.items[item]);
      }
    }
    )
  }


  clearInputField = () => {
    this.setState({searchInput: ''});
  }

  logInOrLogOut = () => {
    console.log(this.state.signedIn)
    if (this.state.signedIn)
      {
        return (
        <div>
          {console.log(this.props.signedInUser)}
          <h2>You're logged in: {this.props.signedInUser.name}</h2>
          <img src={this.props.signedInUser.imageUrl} alt="User profile pic" />
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
        <div>
        <nav>
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input id="search" type="search" value={this.state.searchInput} onChange={this.onSearchInput} required />

                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>

              </div>
            </form>

          </div>
        </nav>
        </div>
        <div className="row">

          { this.searchCards.length > 0 ?
            this.searchCards.map(cardInfos =>
            <ChannelSearchCard
            key ={cardInfos.id.channelId}
            id={cardInfos.id.channelId}
            title={cardInfos.snippet.title}
            thumbnail={cardInfos.snippet.thumbnails.medium.url}
            clearData={ this.clearInputField }
            signedInUser={this.state.signedIn}/>)
              :
              <div className="header">
                {this.logInOrLogOut()}
              </div>
          }

          {
            this.state.signedIn ? <OwnChannelInfo /> : null
          }
        </div>
      </div>
    // End of return
    );

  // End of render
  }
  // End of Component
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