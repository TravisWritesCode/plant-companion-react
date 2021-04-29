import React, { Component, Fragment, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { Auth } from "aws-amplify";
import axios from "axios";
const config = require('../config.json')

export default class PotAdmin extends Component {
    //soilMoistureOutput;
    lightOutput;
    temp = 0;

    state={
      bkg: `${process.env.PUBLIC_URL + "pot-bkg/PlantPhoto.png"}`
    }


    setBKG(){
      var img = this.props.plantType
      var temp = img.toLowerCase()
      const src = `${process.env.PUBLIC_URL}/pot-bkg/${temp}.jpg`
      axios.get(src).then((response) => {
        this.setState({bkg: src});
      }).catch((error) => {
          console.log("Unable to retrive bkg")
      })
    }
    
    componentWillMount() {
      this.setBKG();
    }

  render() { 
    const data = this.props
      /*
      if (this.props.soilMoisture > 21500)
        this.soilMoistureOutput = "Dry"
      else if (this.props.soilMoisture <= 21500 && this.props.soilMoisture > 17000)
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
      <div className="plant plantPhoto" style={{backgroundImage: `url(${this.state.bkg})`}}>
        <div>  
          <Link className="PlantName" to={{pathname:"/potHistory", state: data}}>{this.props.potName}</Link>
          <p className="plantType">{this.props.plantType}</p>
          {
            this.props.pH != null&&this.props.tds != null && this.props.humidity != null?
            <div className="PlantLevels" style={{margin: "120px 0 0 0", height: "250px"}}>
              {this.props.temp == "None" ?<h3 style={{padding: "5px"}}>Temperature: {this.temp}&deg;F</h3>:<h3 style={{padding: "5px"}}>Temperature: {this.props.temp}&deg;F</h3>}
              {this.props.reservoirLevel == "None" ?<h3 style={{padding: "5px"}}>Reservoir Level: {this.temp}</h3>:<h3 style={{padding: "5px"}}>Reservoir Level: {this.props.reservoirLevel}</h3>}
              <h3 style={{padding: "5px"}}>Moisture: {this.props.soilMoisture}</h3>
              <h3 style={{padding: "5px"}}>Light: {this.lightOutput}</h3>
              {this.props.pH == "None" ?<h3 style={{padding: "5px"}}>pH: {this.temp}</h3>:<h3 style={{padding: "5px"}}>pH: {this.props.pH}</h3>}
              {this.props.tds == "None" ?<h3 style={{padding: "5px"}}>TDS: {this.temp}</h3>:<h3 style={{padding: "5px"}}>TDS: {this.props.tds}</h3>}
              {this.props.humidity == "None" ?<h3 style={{padding: "5px"}}>Humidity: {this.temp}</h3>:<h3 style={{padding: "5px"}}>Humidity: {this.props.humidity}</h3>}
            </div>
            :
            <div className="PlantLevels">
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
