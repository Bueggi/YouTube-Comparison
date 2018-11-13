import React, { Component } from 'react';
import '../css/welcomePage.css';

class ToolTips extends Component {

  componentWillMount () {
    this.toolTips = this.sumItAllUp()
  }

  toolTips = [];

  sumItAllUp = () => {
    const data = this.props.data;
    console.log(data)

    const toolTips = [];

    const reducedData = data.datasets.map(dataset => {
      return dataset.data.reduce((acc, value) => {
        return acc + value
      } ,0)
    })

    const sumOfAll = reducedData.reduce((acc, el) => acc + el, 0);
    console.log(reducedData, sumOfAll)

    if(reducedData[0] / sumOfAll < 0.3){
      toolTips.push(['red lighten-2', 'Your traffic from browse features seems to be low. Try adding channel tags to all your videos and be sure checking your audience retention']);
    }
    if (reducedData[1] / sumOfAll > 0.1) {
      toolTips.push(['green lighten-2', 'Good job! You got a lot of search traffic! Check your search terms and produce more videos like that.'])
    }
    if (reducedData[2] / sumOfAll > 0.6) {
      toolTips.push(['green lighten-2', 'People seem to like your videos and click on your suggested videos! What are the most successfull ones and how can you reproduce them?'])
    }

    return toolTips;
  }

  render () {
    console.log(this.toolTips)
    if (this.toolTips.length > 0)
    {
    return (
      <React.Fragment>
        <div class="row">
          {
            this.toolTips.map((el, i) => {
              return <div class="col s12 m5 l3 small">
                        <div class='card-panel teal'>
                          <span class="white-text">
                            {el[1]}
                          </span>
                        </div>
                      </div>
            })
          }
        </div>
      </React.Fragment>
    );
  }
  else return null;
}
}


export default (ToolTips);