import React, { Component } from "react";
import api from "../api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInputChange(stateFieldName, event) {
    let newState = {};
    newState[stateFieldName] = event.target.value;

    this.setState(newState);
  }

  handleClick(e) {
    e.preventDefault();
    api
      .login(this.state.email, this.state.password)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => {
        console.log("ERROR");
      });
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <form className="container col-xs-10 col-sm-8 col-md-8 col-lg-4 card p-4 yellow-bg">
        <p className="text-left mb-0">Email</p>
          <input
            className="form-control"
            type="text"
            value={this.state.email}
            onChange={e => {
              this.handleInputChange("email", e);
            }}
          />{" "}
          <br />
          <p className="text-left mb-0">
            Password
          </p>
          <input
          className="form-control"
            type="password"
            value={this.state.password}
            onChange={e => {
              this.handleInputChange("password", e);
            }}
          />{" "}
          <br />
          <button className="btn btn-primary w-50 mx-auto" onClick={e => this.handleClick(e)}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
