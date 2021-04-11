import React, { Component, Fragment } from 'react';
import axios from "axios";
import { Auth } from "aws-amplify"
import PotHistoryData from './PotHistoryData';
import EditPopup from "./EditPopup";
const config = require('../config.json');

export default class PotHistoryPage extends Component {

/// fix v
  state = {
    potData: []
  }

  togglePop = () => {
    this.setState({
      newpot: !this.state.newpot
    });
  };

  fetchPots = async () => {
    // add call to AWS API Gateway to fetch pots here
    // then set them in state
    try {
      const AccessToken = (await Auth.currentSession())["accessToken"]["jwtToken"]
      const res = await axios.get(`${config.api.devApiUrl}/pot`,  {
        headers: {
          "Authorization": `${AccessToken}`,
          "PotId": `${this.props.location.state.potId}`
        } 
      });
      const potData = res.data.body;
      console.log(potData)
      this.setState({ potData: potData});
    } 
    catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchPots();
  }
  /// fix ^ 

  constructor(props){
    super(props);
    this.state = { showPopup: false };
  }

  togglePopup() {
    this.setState({
     showPopup: !this.state.showPopup
    });
  }

  render() {
    return (
      <Fragment>
        <div className = "container">
          {this.props.auth.isAuthenticated && this.props.auth.user && (
            <h1 className="pTitle">Welcome Back, {this.props.auth.user.username} </h1>
          )}
          <section className="PotHistoryContainer">
          <div>

            <button className="button is-primary" style={{marginBottom:"10px"}} onClick={this.togglePopup.bind(this)}>Edit Pot</button>
              {this.state.showPopup ? this.state.potData.map(potData => <EditPopup  potId={potData.potId} potName={potData.potName} plantType={potData.plantType} text='Edit Pots' valueFromParent={this.state} closePopup={this.togglePopup.bind(this)}/>) : null }
            </div>

            <h1>Pot History</h1>
            <p className="subtitle is-5" style={{color:"#FFFFFF"}}>Here is the history for {this.props.location.state.potName} the {this.props.location.state.plantType}:</p>
            <div className="PotHistory">
            {
            this.state.potData && this.state.potData.length > 0
            ? this.state.potData.map(potData => <PotHistoryData userName={potData.userName} potId={potData.potId} timestamp={potData.timestamp} potName={potData.potName} plantType={potData.plantType} {...potData.sensorData}/>)
            : <div className="tile notification is-warning">You dont have any history on this pot yet.</div>            
            }
            </div>
          </section>
        </div>
      </Fragment>
      )
  }
}
