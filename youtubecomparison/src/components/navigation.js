import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateYouTubeData } from '../actions';


class Navigation extends Component {


  constructor(props) {
    super(props);
    this.state = {
      searchInput: 'hallo'
    };

    this.onSearchInput = this.onSearchInput.bind(this);
  }

  onSearchInput (e) {
    this.setState({searchInput: e.target.value});
  }

  render () {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Creatify</a>

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
    );
  }
}

const mapStateToProps = (state) => ({
  channelsToCompare: state.entities.topics,
});

const mapDispatchToProps = (dispatch) => ({
  updateData: (newData) => dispatch(updateYouTubeData(newData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);