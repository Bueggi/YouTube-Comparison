import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';
import ChannelSearchCard from './pComponents/ChannelSearchCard'


let searchCards = [];
class Navigation extends Component {

// https://www.googleapis.com/youtube.v3/activities?part=snippet,contentDetails&channelId=UCXv-alMKw3H0Y85DLm1mo8A&key=AIzaSyAUcPsPaVuyHMTpHi9Qv3TzGLHRJghVdIM
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
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