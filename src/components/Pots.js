import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import Popup from "./PopUp";
import axios from "axios";
import { Auth } from "aws-amplify"


const config = require('../config.json');

export default class Pots extends React.Component {

  state = {
    newpot: null,
    pots: []
  };

  togglePop = () => {
    this.setState({
      newpot: !this.state.newpot
    });
  };

  render(){
    return(
        <div>
          <div className="btn" onClick={this.togglePop}>
            <button>New Pot?</button>
          </div>
          {this.state.newpot ? <PopUp toggle={this.togglePop} /> : null}
        </div>
    );
  }
}

  fetchPots = async () => {
    // add call to AWS API Gateway to fetch pots here
    // then set them in state
    // try {
    //   const res = await axios.get(`${config.api.invokeUrl}/pot`);
    //   const pots = res.data;
    //   this.setState({ pots: pots});
    // } catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
    try {
      const AccessToken = (await Auth.currentSession())["accessToken"]["jwtToken"]
      const reqBody = {
        "AccessToken" : AccessToken
      }
      const res = await axios.post(`${config.api.devApiUrl}/pots`, reqBody);
      const pots = JSON.parse(res.data.body);
      console.log(pots)
      this.setState({ pots: pots});
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  componentDidMount = () => {
    this.fetchPots();
  }

   

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container" >
          {this.props.auth.isAuthenticated && this.props.auth.user && (
                <h1 className="pTitle">Welcome Back, {this.props.auth.user.username} </h1>
              )}
            <div className="potsContainer">
              <h1>Your Pots</h1>
              <p className="subtitle is-5" style={{color:"#FFFFFF"}}>Here is a list of the pots you have registered:</p>
              <br />
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
