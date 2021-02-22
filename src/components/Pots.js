import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import axios from "axios";
const config = require('../config.json');

export default class Pots extends Component {

  state = {
    newpot: null,
    pots: []
  }

  fetchPots = async () => {
    // add call to AWS API Gateway to fetch pots here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/pot`);
      const pots = res.data;
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
                <div class="pContainer">
                      { 
                        this.state.pots && this.state.pots.length > 0
                        ? this.state.pots.map(pot => <Pot CognitoID={pot.CognitoID} PotID={pot.PotID} timestamp={pot.timestamp} nickname={pot.nickname} {...pot.sensorData} key={pot.CognitoID} />)
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
