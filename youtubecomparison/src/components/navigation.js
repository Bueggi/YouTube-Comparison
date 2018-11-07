import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';
import ChannelSearchCard from './pComponents/ChannelSearchCard'

const {google} = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: 'http://localhost.3000'.oAuth2Client,
});



let searchCards = [];

class Navigation extends Component {

 constructor (props) {
    super(props);
    this.state = {
      searchInput: '',

    };
    this.GoogleAuth = null
  }

  initClient = () => {
  window.gapi.client.init({
    'apiKey': '314239737420-gjdh038nnos438r8cv04gi96nsie58n2.apps.googleusercontent.com',
    'clientId': 'tQ71yzS8aLV4QHK1wvTumL1l',
    'scope': 'https://www.googleapis.com/auth/yt-analytics.readonly',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtubeAnalytics/v1/rest']
  }).then(function () {
    this.GoogleAuth = window.gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    // this.state.GoogleAuth.isSignedIn.listen(updateSigninStatus);
})
  }

  componentDidMount () {
    this.initClient()
  }

  render () {


     const onSearchInput = (e) => {
        const value = e.target.value;
        this.setState({searchInput: value});
        if (value === '') {
          searchCards = []
        }
        else {
          showChannels(value);
        }
      }

    const showChannels = (channelToSearchFor) => {
      fetch(`https://www.googleapis.com/youtube/v3/search?type=channel&q=${channelToSearchFor}&part=snippet&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM&maxResults=4`)
      .then(data => data.json())
      .then(data => {
        searchCards = [];
        for (let item in data.items) {
          searchCards.push(data.items[item]);
        }
      }
      )
    }

    return (
      <div>
        <div>
        <nav>
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input id="search" type="search" value={this.state.searchInput} onChange={onSearchInput} required />

                <label className="label-icon" for="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>

              </div>
            </form>

          </div>
        </nav>
        </div>
        <div className="row">
          { searchCards.length > 0 ?
            searchCards.map(cardInfos => <ChannelSearchCard key ={cardInfos.id.channelId} id={cardInfos.id.channelId} title={cardInfos.snippet.title}
              thumbnail={cardInfos.snippet.thumbnails.medium.url} />)
              :
              <div className="header">
                <h1>Compare YouTube-Channels</h1>
                <h2>Make your channel grow bigger than your ego!</h2>
                <a class="waves-effect waves-light btn-large">Sign In with Youtube</a>
              </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);