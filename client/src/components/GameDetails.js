import React, { Component } from "react";
import api from "../api";
import Gamelist from "./Gamelist";
import "./GameDetails.css";
import sThumbsUp from "../images/thumbs-down-regular.svg";
import rThumbsUp from "../images/thumbs-up-regular.svg";
import sThumbsDown from "../images/thumbs-up-solid.svg";
import rThumbsDown from "../images/thumbs-down-solid.svg";
import heart from "../images/heart-solid.svg";

class Gamedetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {
        keywords: ["hello", "world"]
      }
    };
  }
  componentDidMount() {
    console.log("ENTERING gamedetail-componentDidMount");
    api
      .getGame(this.props.match.params.id)
      .then(game => {
        this.setState({ game });
      })
      .catch(err => console.log("could not set state for GameDetail: ", err));
  }
  render() {
    console.log("Render GameDetail", this.state.game);
    return (
      <div className="Gamedetail container">
        {" "}
        {/* can this be an article-tag, and the four inside section-tags? */}
        <h2>{this.state.game.name}</h2>
        <div className="border-danger card col">
          <div className="row h-100">
            <div className="w-100">
              <a href={this.state.game.gameURL}>
                <img className="GameDetailImage"
                  src={this.state.game.imgURL}
                  alt="Click here to play"
                />
              </a>
            </div>
            <div className="w-50">
              <h4>About {this.state.game.name}</h4>
              <p>{this.state.game.description}</p>
            </div>
          </div>

          <div className="row h-50">
            <ul className="row w-100">
              {this.state.game.keywords.map((gameKeyword, i) => (
                <li
                  className="list-unstyled bg-secondary text-light mx-1 px-1 border rounded"
                  key={i}
                >
                  {gameKeyword}
                </li>
              ))}
            </ul>
            <div className="w-50 col">
              <div className="col">
                <p>Add to favorites</p>
                {/*<a href="#">❤️</a>*/}
                <img className="heart" src={heart} alt=""/>
              </div>
              <div className="col">
                <p>Score: this.state.score?</p>
                <img className="thumb" src={sThumbsUp} alt="thumb" />
                <img className="thumb" src={rThumbsUp} alt="thumb" />
                <img className="thumb" src={sThumbsDown} alt="thumb" />
                <img className="thumb" src={rThumbsDown} alt="thumb" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gamedetails;
