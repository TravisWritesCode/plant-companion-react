import React, { Component, Fragment } from 'react';
import Pot from './Pot';
import axios from "axios";
const config = require('../config.json');

export default class AddPot extends Component {

  state = {
    newpot: { 
      "potname": "", 
      "id": ""
    },
    pot: []
  }

  handleAddPot = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add pot endpoint here
    try {
      const params = {
        "id": id,
        "potname": this.state.newpot.potname
      };
      await axios.post(`${config.api.invokeUrl}/pots/${id}`, params);
      this.setState({ pots: [...this.state.pots, this.state.newpot] });
      this.setState({ newpot: { "potname": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdatePot = async (id, name) => {
    // add call to AWS API Gateway update pot endpoint here
    try {
      const params = {
        "id": id,
        "potname": name
      };
      await axios.patch(`${config.api.invokeUrl}/pots/${id}`, params);
      const potToUpdate = [...this.state.pots].find(pot => pot.id === id);
      const updatedPots = [...this.state.pots].filter(pot => pot.id !== id);
      potToUpdate.potname = name;
      updatedPots.push(potToUpdate);
      this.setState({pots: updatedPots});
    }catch (err) {
      console.log(`Error updating pot: ${err}`);
    }
  }

  handleDeletePot = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete pot endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/pots/${id}`);
      const updatedPots = [...this.state.pots].filter(pot => pot.id !== id);
      this.setState({pots: updatedPots});
    }catch (err) {
      console.log(`Unable to delete pot: ${err}`);
    }
  }

  fetchPots = async () => {
    // add call to AWS API Gateway to fetch pots here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/pot`);
      const pots = res.data;
      this.setState({ pots: pots });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddPotNameChange = event => this.setState({ newpot: { ...this.state.newpot, "potname": event.target.value } });
  onAddPotIdChange = event => this.setState({ newpot: { ...this.state.newpot, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchPots();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Add a Pot</h1>
            <p className="subtitle is-5">Add and remove pots using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddPot(this.state.newpot.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newpot.potname}
                        onChange={this.onAddPotNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newpot.id}
                        onChange={this.onAddPotIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add pot
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.pots.map((pot, index) => 
                        <Pot 
                          isAdmin={true}
                          handleUpdatePot={this.handleUpdatePot}
                          handleDeletePot={this.handleDeletePot} 
                          name={pot.potname} 
                          id={pot.id}
                          key={pot.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
