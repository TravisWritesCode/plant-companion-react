import React, { Component, Fragment, useEffect }  from 'react';

export default class PotHistoryData extends Component {
  soilMoistureOutput;
  render() { 
    const data = this.props.sensorData
    const dateData = this.props.timestamp
    const dateObject = new Date(dateData * 1000)
    const dateOutput = dateObject.toLocaleString()
      if (this.props.soilMoisture > 21500)
        this.soilMoistureOutput = "Dry"
      else if (this.props.soilMoisture <= 21500 && this.props.soilMoisture > 17000)
          this.soilMoistureOutput = "Ideal"
      else if (this.props.soilMoisture <= 17000 && this.props.soilMoisture > 16000)
          this.soilMoistureOutput = "Wet"
      else
          this.soilMoistureOutput = "Over-Watered"
    console.log(data)
    return (
      <div className="potData">
        <div>
          <div className="PotHistoryEntry">
            <h3>Date: {dateOutput}</h3>
            <h3>Temperature: {this.props.temp}&deg;F</h3>
            <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
            <h3>Moisture: {this.soilMoistureOutput}</h3>
            <h3>Sun: {this.props.photosensor}</h3>
          </div>
        </div>
      </div>
    )
  }
}
