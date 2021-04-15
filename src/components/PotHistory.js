import React, { Component, Fragment} from 'react';
import axios from "axios";
//import PropTypes from 'prop-types';
import { Auth } from "aws-amplify"
import PotHistoryData from './PotHistoryData';
import EditPopup from "./EditPopup";
import Pagination from "./Pagination";
const config = require('../config.json');

export default class PotHistoryPage extends Component {

  state = {
    potData: [],
    itemsTest: []
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
      const itemsTest = [...Array(potData.length)].map(itemsTest => <PotHistoryData userName={potData.userName} potId={potData.potId} timestamp={potData.timestamp} potName={potData.potName} plantType={potData.plantType} {...potData.sensorData}/>);
      console.log(potData)
      console.log(itemsTest)
      this.setState({ potData: potData});



    } 
    catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }


  componentDidMount = () => {
    this.fetchPots();
  }
/*
  constructor(props){
    super(props);
    // var itemsTest = [...Array(3).keys()].map(potData => <PotHistoryData userName={potData.userName} potId={potData.potId} timestamp={potData.timestamp} potName={potData.potName} plantType={potData.plantType} {...potData.sensorData}/>)
     var itemTest = [...Array(15).keys()].map(i => ({ id: (i+1), name: 'list item ' + (i+1) }));
    //var itemsTest = this.props;
    console.log(itemTest);
    this.state = {
      showPopup: false,
      itemTest: itemTest,
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
    // change here
  }
*/
   constructor(props){
    super(props);
    // var itemsTest = [...Array(3).keys()].map(potData => <PotHistoryData userName={potData.userName} potId={potData.potId} timestamp={potData.timestamp} potName={potData.potName} plantType={potData.plantType} {...potData.sensorData}/>)
    var itemTest = [...Array(15).keys()].map(i => ({ id: (i+1), name: 'list item ' + (i+1) }));
    //var itemsTest = [];
    console.log(itemTest);
    this.state = {
      showPopup: false,
      itemTest: itemTest,
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
    // change here
  }

    //v
  onChangePage(pageOfItems) {
    this.setState({pageOfItems: pageOfItems});
  }
  //^

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
            ? this.state.pageOfItems.map(potData => <PotHistoryData userName={potData.userName} potId={potData.potId} timestamp={potData.timestamp} potName={potData.potName} plantType={potData.plantType} {...potData.sensorData}/>)
            : <div className="tile notification is-warning">You dont have any history on this pot yet.</div>
            }

            <Pagination items = {this.state.potData} onChangePage={this.onChangePage} />
            </div>
          </section>
        </div>
      </Fragment>
      )
  }
}
