import React, { Component, Fragment, useEffect }  from 'react';

export default class PotHistoryData extends Component { 
  render() { 
    const data = this.props.sensorData
    console.log(data)
    return (
      <div className="potData">
        <div>
          <div className="PotHistoryEntry">
            <h3>Time: {this.props.timestamp}</h3>
            <h3>Temperature: {this.props.temp}&deg;F</h3>
            <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
            <h3>Moisture: {this.props.soilMoisture}</h3>
            <h3>Sun: {this.props.photosensor}</h3>
          </div>
        </div>
      </div>
    )
  }
}
