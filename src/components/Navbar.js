import { Auth } from 'aws-amplify';
import React, { Component } from 'react'
// const history = useHistory();
// import { useHistory } from "react-router-dom";

export default class Navbar extends Component {
  
  handleLogOut = async event => {
    event.preventDefault();
    try {

      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);  
      await Auth.signOut()
      .then(data => document.location.href = "/login")
    }catch(error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item" >
            <img src="pot.png" alt="PC Logo" />
          </div>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
        {this.props.auth.isAuthenticated && (
          <div className="navbar-start">
            <a href="/pots" className="navbar-item">
              Home
            </a>
            {/*<a href="/pots" className="navbar-item">
              Pots
            </a>
            <a href="/addpot" className="navbar-item">
              Add Pot
            </a>*/}
          </div>
        )}

          <div className="navbar-end">
            <div className="navbar-item">
              {/*this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )*/}
              <div className="buttons">
                
                {/* Hide login and register buttons if user is logged in */}
                {!this.props.auth.isAuthenticated && (
                <div>
                  <a href="/register" className="button is-primary"><strong>Register</strong></a>
                  <a href="/login" className="button is-light">Log in</a>
                </div>
                )}
                
                {/* Display Logout button if user is logged in  */}
                {this.props.auth.isAuthenticated && (
                  <a href="/login" onClick={this.handleLogOut} className="button is-light">Log Out</a>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
