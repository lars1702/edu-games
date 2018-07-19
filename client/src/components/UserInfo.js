import React, { Component } from "react";
import api from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    console.log("COMP UserInfo");
    api.getProfile().then(user => {
      console.log("helllloooooooooo", user);
      this.setState({
        user: user
      });
    });
  }
  render() {
    console.log("renderrrr");
    let favorites =
      this.state.user && this.state.user._favs.map(e => <p>{e.title}</p>);
    return (
      this.state.user && (
        <div className="UserInfo container">
          <div>
            <h2>{this.state.user.email}</h2>
            <p>{this.state.user.name}</p>
            {this.state.user._favs.map(favObj => (
              <div className="card m-2">
                <p>{favObj.title}</p>
                <ul>
                  {favObj.games.map((game, i) => (
                    <Link to={`/games/${game._id}`}>
                      <li className="">{game.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
}

export default UserInfo;
