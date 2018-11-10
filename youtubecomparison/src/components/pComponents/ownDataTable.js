import React, { Component } from 'react';
import { connect } from 'react-redux';

class OwnDataTable extends Component {

  constructor (props) {
    super(props);
    this.state = {
      chartData: null
    }
  }

  componentDidUpdate () {
    if (this.props.ownChannel_Views && !this.state.chartData) {
      this.setState({
      chartData: this.dataToStatistics(this.props.ownChannel_Views.columnHeaders, this.props.ownChannel_Views.rows)
    });
  }
  }

  dataToStatistics = (headers, rows) => {
    const result = {
    }

    const headersArray = headers.map(el => el.name)
    const headerArr = headers.map(el => result[el.name] = 0)

    rows.reduce((acc, el) => {
      el.map((element, i) => {
        return result[headersArray[i]] += element;
      })
      return acc;
    }, headerArr)
    console.log(headers)
    console.log('////// result of computation', result)
    return result;
  }


  render () {
    return (
      <div className="container row">
        <div className="col l12 s12">
          <table className="responsive-table centered striped">
            <thead>
              <tr>
                <th>Channel</th>
              {this.state.chartData ?
              Object.keys(this.state.chartData).filter(el => el !== 'day').map((el, i) => {
                return (
                      <th>{el}</th>
                  )
              }) : null
            }
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.signedInUser.name}</td>
                {this.state.chartData ?
                Object.keys(this.state.chartData).filter(el => el !== 'day').map((el, i) => {
                  return (
                        <td>{this.state.chartData[el].toLocaleString()}</td>
                    )
                }) : null
              }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ownChannel_Views: state.entities.ownChannelData_Views,
  signedInUser: state.user.signedInUser,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnDataTable);