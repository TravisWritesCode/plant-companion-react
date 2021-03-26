import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import Popup from "./Popup";
import axios from "axios";
import { Auth } from "aws-amplify"

const config = require('../config.json');

export default class Pots extends React.Component {

  state = {
    pots: []
  };

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
      const res = await axios.get(`${config.api.devApiUrl}/pot`,{
        headers: {
          "Authorization": `${AccessToken}`,
        }
      });
      const pots = res.data.body;
      console.log(res.data.body)
      this.setState({ pots: pots});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchPots();
  }

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
        <section className="section">
          <div className="container" >
          {this.props.auth.isAuthenticated && this.props.auth.user && ( <h1 className="pTitle">Welcome Back, {this.props.auth.user.username} </h1> )}
            <div className="potsContainer">
              <h1>Your Pots</h1>
              <p className="subtitle is-5" style={{color:"#FFFFFF"}}>Here is a list of the pots you have registered:</p>
              
              <div>
                <button className="button is-primary" style={{marginBottom:"10px"}} onClick={this.togglePopup.bind(this)}>Add Pot</button>
                {this.state.showPopup ? <Popup text='Add Pots' closePopup={this.togglePopup.bind(this)}/> : null }
              </div>

              <div className="pContainer">
                { 
                  //TODO: for each pot add the pot id to an array
                  //TODO: Before painting a pot to the screen check to see if the pot's ID is in the array.
                  //      If it is not paint the pot, else skip the pot 
                  this.state.pots && this.state.pots.length > 0
                  ? this.state.pots.map(pot => <Pot userName={pot.userName} potId={pot.potId} timestamp={pot.timestamp} potName={pot.potName} plantType={pot.plantType} {...pot.sensorData}/>)
                  : <div className="tile notification is-warning">You dont have any pots registered yet.</div>
                }
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
