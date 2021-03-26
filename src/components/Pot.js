import React, { Component, Fragment, useEffect }  from 'react';
import { Link } from 'react-router-dom';

export default class PotAdmin extends Component { 
  
  render() { 
    const data = this.props
    console.log(data)
    return (
      
      <div className="plant plantPhoto">
        <div>
          <Link className="PlantName" to={{pathname:"/potHistory", state: data}}>{this.props.potName}</Link>
          <p className="plantType">{this.props.plantType}</p>
          <div className="PlantLevels">
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
