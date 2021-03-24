import React, { Component, Fragment, useEffect }  from 'react';

const config = require('../config.json');


export default class PotAdmin extends Component {
  
  
  render() { 
    const data = this.props.sensorData
    console.log(data)
    return (
      <Fragment>
         <div className="plant plantPhoto">
        <div>
              <p className="PlantName"><a href="/pothistory">{this.props.potName}</a></p>
              <p className="plantType">{this.props.plantType}</p>
              <div className="PlantLevels">
                  <h3>Temperature: {this.props.temp}&deg;F</h3>
                  <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
                  <h3>Moisture: {this.props.soilMoisture}</h3>
                  <h3>Sun: {this.props.photosensor}</h3>
              </div>
          </div>
      </div>
      </Fragment>
     
    )
  }

}
