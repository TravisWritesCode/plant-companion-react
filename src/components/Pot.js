import React, { Component, Fragment, useEffect }  from 'react';
import { Link } from 'react-router-dom';

export default class PotAdmin extends Component {
    soilMoistureOutput;
  render() { 
    const data = this.props
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
      <div className="plant plantPhoto">
        <div>
          <Link className="PlantName" to={{pathname:"/potHistory", state: data}}>{this.props.potName}</Link>
          <p className="plantType">{this.props.plantType}</p>
          <div className="PlantLevels">
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
