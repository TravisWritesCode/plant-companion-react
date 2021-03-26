import React, { Component, Fragment } from 'react';
import axios from "axios";
import { Auth } from "aws-amplify"
const config = require('../config.json');


class Popup extends React.Component {

  state = {
    potId: "",
    potName: "",
    plantType: "",
    accessToken: "",
    potIsValid: false,
    potIsAssigned: false
  };
  
  checkIsPot = async () => {
    try {
      
      const reqBody = {
        "potId": parseInt(this.state.potId)
      }
      const res = await axios.post(`${config.api.devApiUrl}/isPot`, reqBody, {
        headers: {
          "Authorization": this.state.accessToken,
        }
      });
      return res["data"]
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  assignPot = async () => {
    try {
      const reqBody = {
        "potId": parseInt(this.state.potId),
        "potName" : this.state.potName,
        "plantType": this.state.plantType
      }
      const res = await axios.post(`${config.api.devApiUrl}/assignPot`, reqBody, {
        headers: {
          "Authorization": this.state.accessToken,
        }
      });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
  
  handleSubmit = async event=> {
    event.preventDefault();
    try {
      const data = await this.checkIsPot()
      console.log(data)
      const statusCode = data["statusCode"]
      if (statusCode==200) {
        // Change boolean values in state based on pot status 
        if (data["body"]["isAssigned"]) {
          this.state.potIsAssigned = true;
        }
        if (data["body"]["isPot"]) {
          this.state.potIsValid = true;
        }
        // Pot is not assigned and the pot id is valid. This means the pot can be assigned with no issue. 
        if(!this.state.potIsAssigned && this.state.potIsValid) {
          this.assignPot()
          this.props.closePopup()
        }
        // Confirm overwrite if pot id is already assigned
        else if (this.state.potIsAssigned && this.state.potIsValid){
          // If affirmative, overwrite user id in db
          if (window.confirm("This pot is already assigned. Would you like to overwrite?")){
            this.assignPot()
            this.props.closePopup()
          }
        }
        // Alert if invalid pot id entered
        if (!this.state.potIsValid){
          alert("You entered an invalid pot ID.")
        }
      }
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  componentDidMount = async() => {
    this.state.accessToken = (await Auth.currentSession())["accessToken"]["jwtToken"];
  }


  render() {
    return (
        <div className='popup'>
          <div className='popup_open'>
              <h2>{this.props.text}</h2>
                  <form>

                      <div className="field">
                        <p className="control">
                          <input 
                            className="input" 
                            type="text"
                            id="potId"
                            placeholder="Enter Pot ID"
                            value={this.state.potId}
                            onChange={this.onInputChange}
                          />
                        </p>
                      </div>

                      <div className="field">
                        <p className="control">
                          <input 
                            className="input" 
                            type="text"
                            id="potName"
                            placeholder="Enter Pot Name"
                            value={this.state.potName}
                            onChange={this.onInputChange}
                          />
                        </p>
                      </div>

                      <div className="field">
                        <p className="control">
                          <input 
                            className="input" 
                            type="text"
                            id="plantType"
                            placeholder="Enter Plant Type"
                            value={this.state.plantType}
                            onChange={this.onInputChange}
                          />
                        </p>
                      </div>

                  </form>

                  <button className="button is-danger popupButton" onClick={this.props.closePopup}><strong>Cancel</strong></button>
                  <button className="button is-success popupButton" onClick={this.handleSubmit} style={{"marginLeft": "5px"}}><strong>Submit</strong></button>

          </div>
        </div>
        );
    }
}
export default Popup;