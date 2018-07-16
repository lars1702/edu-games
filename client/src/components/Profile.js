import React, { Component } from 'react';
import api from '../api';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';



class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
        user: {}
    }
  }

  componentDidMount() {
    api.getProfile()
    .then(user =>{
        this.setState({
            user: user
        })
    })
  }
  render() {                
    return (
      <div className="Home">
        <h2>{this.state.user.email}</h2>
        {Object.entries(this.state.user).map((element, i) => {return <p key= {element._id}>{element.join(" - ")}</p>})} {/* the "element" (last one here) is an array of two elements: the key and the value of the current key-value pair of the object you're iterating through. try to split them and display the with a seperator somehow like "_id - 1123456" */}
        {this.state.user._games}
        <div className="card"></div>
      
      </div>
    );
  }
}

export default Profile;
