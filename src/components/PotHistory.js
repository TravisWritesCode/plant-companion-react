import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import axios from "axios";
import { Auth } from "aws-amplify"


const config = require('../config.json');

export default class Pots extends Component {

  state = {
    newpot: null,
    pots: []
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
          
        </section>
      </Fragment>
    )
  }
}
