import React, { Component, Fragment, useEffect }  from 'react';

export default class PotHistoryData extends Component {
  //soilMoistureOutput;
  lightOutput;
  temp =0;
  render() { 
    const data = this.props.sensorData
    const dateData = this.props.timestamp
    const dateObject = new Date(dateData * 1000)
    const dateOutput = dateObject.toLocaleString()
    /*
      if (this.props.soilMoisture > 23000)
        this.soilMoistureOutput = "Dry"
      else if (this.props.soilMoisture <= 23000 && this.props.soilMoisture > 17000)
          this.soilMoistureOutput = "Ideal"
      else if (this.props.soilMoisture <= 17000 && this.props.soilMoisture > 16000)
          this.soilMoistureOutput = "Wet"
      else
          this.soilMoistureOutput = "Over-Watered"
    */
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
        {
            this.props.pH != null&&this.props.tds != null && this.props.humidity != null?
          <div className="PotHistoryEntry" style={{gridTemplateColumns: "auto auto auto auto auto", gridColumnGap: "40px", gridRowGap: "20px"}}>
            <h3 className = "dateItem">Date: {dateOutput}</h3>
            {this.props.temp == "None" ?<h3>Temperature: {this.temp}&deg;F</h3>:<h3>Temperature: {this.props.temp}&deg;F</h3>}
            {this.props.reservoirLevel == "None" ?<h3>Reservoir Level: {this.temp}</h3>:<h3>Reservoir Level: {this.props.reservoirLevel}</h3>}
            <h3>Moisture: {this.props.soilMoisture}</h3>
            <h3>Light: {this.lightOutput}</h3>
            {this.props.pH == "None" ?<h3 >pH: {this.temp}</h3>:<h3>pH: {this.props.pH}</h3>}
            {this.props.tds == "None" ?<h3 >TDS: {this.temp}</h3>:<h3>TDS: {this.props.tds}</h3>}
            {this.props.humidity == "None" ?<h3 >Humidity: {this.temp}</h3>:<h3>Humidity: {this.props.humidity}</h3>}
          </div>
          :
          <div className="PotHistoryEntry">
            <h3>Date: {dateOutput}</h3>
            {this.props.temp == "None" ?<h3>Temperature: {this.temp}&deg;F</h3>:<h3>Temperature: {this.props.temp}&deg;F</h3>}
            {this.props.reservoirLevel == "None" ?<h3>Reservoir Level: {this.temp}</h3>:<h3>Reservoir Level: {this.props.reservoirLevel}</h3>}
            <h3>Moisture: {this.props.soilMoisture}</h3>
            <h3>Light: {this.lightOutput}</h3>
          </div>
        }
        </div>
      </div>
    )
  }
}
