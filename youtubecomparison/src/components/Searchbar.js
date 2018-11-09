import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData} from '../actions';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import ChannelSearchCard from './pComponents/ChannelSearchCard';

import './css/searchbar.css';


class Searchbar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchInput: '',
    };
    this.searchCards = [];
  }

  // debounce showChannels function so the call to the API can only be made every 0.5s
  showChannelsDebounced = AwesomeDebouncePromise(this.showChannels, 500);

  // handler for the SearchInput
  //
  onSearchInput = (e) => {
    const value = e.target.value;
    this.setState({searchInput : value});

    if (value === '') {
      this.searchCards = [];
    }
    else {
      this.showChannels(value);
    }
  }

  // fetches the Data from the YoutubeAPI based on Input
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

  render () {
    return (
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


        <div className="row absolute_position">
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
              null
          }
      </div>

    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.channelsToCompare,
  signedInUser: state.user.signedInUser
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);