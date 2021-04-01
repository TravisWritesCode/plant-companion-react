import React, { Component, Fragment, useEffect }  from 'react';

export default class PotHistoryData extends Component {
  soilMoistureOutput;
  lightOutput;
  render() { 
    const data = this.props.sensorData
    const dateData = this.props.timestamp
    const dateObject = new Date(dateData * 1000)
    const dateOutput = dateObject.toLocaleString()
      if (this.props.soilMoisture > 23000)
        this.soilMoistureOutput = "Dry"
      else if (this.props.soilMoisture <= 23000 && this.props.soilMoisture > 17000)
          this.soilMoistureOutput = "Ideal"
      else if (this.props.soilMoisture <= 17000 && this.props.soilMoisture > 16000)
          this.soilMoistureOutput = "Wet"
      else
          this.soilMoistureOutput = "Over-Watered"

    if (this.props.photosensor > 1200)
      this.lightOutput = "High"
    else if (this.props.photosensor <= 1200 && this.props.photosensor > 250)
      this.lightOutput = "Medium"
    else
      this.lightOutput = "Low"
    console.log(data)
    return (
      <div className="potData">
        <div>
          <div className="PotHistoryEntry">
            <h3>Date: {dateOutput}</h3>
            <h3>Temperature: {this.props.temp}&deg;F</h3>
            <h3>Reservoir Level: {this.props.reservoirLevel}</h3>
            <h3>Moisture: {this.soilMoistureOutput}</h3>
            <h3>Light: {this.lightOutput}</h3>
          </div>
        </div>
      </div>
    )
  }
}
