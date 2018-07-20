import React, { Component } from "react";
import api from "../api";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
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
    let data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password
    };
    api
      .signup(data)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/login"); // Redirect to the login page
      })
      .catch(err => {
        console.log("ERROR");
      });
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
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
          <p className="text-left mb-0">Name</p>
          <input
            className="form-control"
            type="text"
            value={this.state.name}
            onChange={e => {
              this.handleInputChange("name", e);
            }}
          />{" "}
          <br />
          <p className="text-left mb-0">Password</p>
          <input
            className="form-control"
            type="password"
            value={this.state.password}
            onChange={e => {
              this.handleInputChange("password", e);
            }}
          />{" "}
          <br />
          <button className="btn btn-primary w-50 mx-auto" onClick={e => this.handleClick(e)}>Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
