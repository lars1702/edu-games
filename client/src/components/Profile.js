import React, { Component } from 'react';
import api from '../api';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddGame from './AddGame'


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
        user: {}
    }
  }

  componentDidMount() {
    console.log("COMP")
    api.getProfile()
    .then(user =>{
        this.setState({
            user: user
        })
    })
  }
  render() {
    console.log("RENDER")
    return (
      <div className="Profile container">
        <div>
          <h2>{this.state.user.email}</h2>
          {Object.entries(this.state.user).map((element, i) => {return <p key= {i}>{element.join(" - ")}</p>})} {/* the "element" (last one here) is an array of two elements: the key and the value of the current key-value pair of the object you're iterating through. try to split them and display the with a seperator somehow like "_id - 1123456" */}
          {this.state.user._games}
        </div>
        <AddGame/>
      </div>
    );
  }
}

export default Profile;
