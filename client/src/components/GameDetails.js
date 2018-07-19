import React, { Component } from "react";
import api from "../api";
// import Gamelist from "./Gamelist";
import "./GameDetails.css";
import heart from "../images/heart-solid.svg";
import SaveGame from "./SaveGame"


class Gamedetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      game: null,
      favs: []
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

      api.getMyFavs().then(favs => {
        this.setState({
          favs
        })
      })
  }
  render() {
    console.log("Render GameDetail", this.state.game);
    return (
      this.state.game && <div className="Gamedetail container col-xl-9">
        {" "}
        {/* can this be an article-tag, and the four inside section-tags? */}
        <h2>{this.state.game.name}</h2>
        <div className="game-detail mx-0 card">
          <div className="d-flex row mx-0">
            <div className="mx-0">
              <a href={this.state.game.gameURL}>
                <img className="rounded game-img img-fluid"
                  src={this.state.game.imgURL}
                  alt="Click here to play"
                />
              </a>
            </div>
            <div className="col">
              <h4 className="font-weight-bold">About {this.state.game.name}</h4>
              <hr className="w-50 mx-auto mt-0 mb-1"/>
              <p>{this.state.game.description}</p>
            </div>
          </div>

          <hr className="w-75 mx-auto my-4"/>
          
          <div className="row mx-2">
            <div className="col-md-6">
              <h4>Keywords</h4>
              <ul className="row">
                {this.state.game.keywords.map((gameKeyword, i) => (
                  <li
                    className="list-unstyled bg-secondary text-light mx-1 px-1 ell rounded"
                    key={i}
                  >
                    {gameKeyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <div className="col">
                <div className="w-75 mx-auto">
                <h5>
                  Add game
                </h5>
                    <SaveGame gameId={this.state.game._id} className="" favs={this.state.favs}/>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Gamedetails;
