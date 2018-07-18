import React, { Component } from "react";
import api from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./AddGame";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    console.log("COMP UserInfo");
    api.getProfile().then(user => {
      console.log("helllloooooooooo", user)
      this.setState({
        user: user
      });
    });
  }
  render() {
    // let favorites = this.state.user._favs.map(e=> <p>{e}</p>)
    console.log("useer ",this.state.user)
    // let x=this.state.user._favs?<p>no favs</p>:<p>{this.state.user._favs.forEach(e => e)}</p>
    return (
      this.state.user && <div className="UserInfo container">
        <div>
        {/* {this.state.user._favs} */}
          <h2>{this.state.user.email}</h2>
          <p>{this.state.user.name}</p>
           <h3>
             {/* {!this.state.user._favs  
             ? <p>no favs</p>
             :<p> {favorites}</p>} */}
             {/* {this.state.user._favs[0] && "this.state.user._favs"} */}
           </h3>
          {/* <p>{this.state.user._games.name}</p> */}

          {/* {Object.entries(this.state.user).map((elem, i) => {
            let fav = !elem._favs ? <p>no favorites!</p>:<p>elem._favs</p>
            return fav
          })} */}
        </div>
      </div>
    );
  }
}

export default UserInfo;
