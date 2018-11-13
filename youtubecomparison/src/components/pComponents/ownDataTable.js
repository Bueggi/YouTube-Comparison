import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/ownChannelInfo.css'

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
      chartData: this.dataToStatistics(this.props.ownChannel_Views.datasets)
    });
  }
  }

  dataToStatistics = (data) => {
    console.log(data);
    const result = {
    }

    console.log(data)
    const headersArray = data.map(el => el.label)
    headersArray.map(el => result[el.label] = 0)

    console.log(result);

      data.reduce((acc, el) => {
        el.map((element, i) => {
          return result[headersArray[i]] += element;
        })
        return acc;
      }, 0)

      console.log(result)
    return result;
  }


  render () {
    return (
      <div className="row">
        <div className="col l12 s12">
          <table className="responsive-table centered striped white-bg">
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