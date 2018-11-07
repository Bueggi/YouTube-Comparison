import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';
import ChannelSearchCard from './pComponents/ChannelSearchCard'
import GoogleLogin from './GoogleLogin';


let searchCards = [];

class Navigation extends Component {

 constructor (props) {
    super(props);
    this.state = {
      searchInput: '',
      signedInUser : null

    };
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

    const clearInputField = () => {
      this.setState({searchInput: ''});
    }

    const responseGoogle = (response) => {
      this.setState({signedInUser: response});
      console.log(response.getId());
      console.log(typeof response)
    }

    const logInOrLogOut = () => {
      if (this.state.signedInUser && this.state.signedInUser.isSignedIn())
      {
        return (<div>Hello, beautiful human being</div>)
      }
      else {
        return (
          <div>
            <h1>Compare YouTube-Channels</h1>
            <h2>Make your channel grow bigger than your ego!</h2>
            <GoogleLogin
            clientId="314239737420-gjdh038nnos438r8cv04gi96nsie58n2.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="waves-effect waves-light btn-large"
            buttontext="Sign in with YouTube"
            scope={'https://www.googleapis.com/auth/yt-analytics.readonly'} />
          </div>
        )
      }

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
                {logInOrLogOut()}
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