import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateStartDate, updateEndDate} from '../../actions';
import moment from 'moment';

class DatePicker extends Component {

  constructor (props) {
    super(props);
    this.handleDatePickerClick = this.handleDatePickerClick.bind(this);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate
    }
  }

  componentDidMount () {
    this.setState({
      startDate: this.props.startDate,
      endDate: this.props.endDate
    });
  }

  handleDatePickerClick = () => {
    this.props.updateStartDate(this.state.startDate);
    this.props.updateEndDate(this.state.endDate);
  }

  handleDateChange = (e) => {
    if (e.target.id === "startDate" && e.target.value < this.state.endDate)
      this.setState({startDate: e.target.value})
    if (e.target.id === "endDate" && e.target.value > this.state.startDate) {
      this.setState({endDate: e.target.value})
    }
  }

  render () {
    return (
      <div>
        <h3>Choose start and end of analytics</h3>
          <div className="flex flex-bottom-margin">
            <div className="flex-1">
              <label htmlFor="startDate" className="flex-1">Start Date</label>
              <input id="startDate" type="date" value={this.state.startDate} onChange={this.handleDateChange} max={moment(this.state.endDate).subtract(1, 'days')} required>
              </input>
            </div>

            <div className="flex-1">
              <label htmlFor="endDate">End Date</label>
              <input id="endDate" type="date" value={this.state.endDate} onChange={this.handleDateChange} max={moment().format('YYYY-MM-DD')} required>
              </input>
            </div>
          </div>

          <button className="waves-effect waves-light btn" onClick={this.handleDatePickerClick}>Change Date Range</button>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  startDate: state.entities.startDate,
  endDate: state.entities.endDate
});

const mapDispatchToProps = (dispatch) => ({
  updateStartDate: (date) => dispatch(updateStartDate(date)),
  updateEndDate: (date) => dispatch(updateEndDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);