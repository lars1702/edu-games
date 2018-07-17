import React, { Component } from "react";
import api from "../api";
import "./Gamelist.css";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import Shiitake from "shiitake";
import sThumbsUp from "../images/thumbs-down-solid.svg";
import sThumbsDown from "../images/thumbs-up-solid.svg";
import heart from "../images/heart-solid.svg";


class Gamelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      searchTerm: ""
    };
  }
  componentDidMount() {
    console.log("componentdidmount");
    api
      .getGames()
      .then(games => {
        console.log("GAMES:", games);
        this.setState({ games });
      })
      .catch(err => console.log(err));
  }

  handleSearch(e) {
    this.setState({
      searchTerm: e.target.value
    });
  }

  render() {
    console.log("byeeee");
    return (
      <div className="Gamelist container">
        <h2>Games</h2>
        <Searchbar
          onSearch={this.handleSearch.bind(this)}
          searchTerm={this.state.searchTerm}
        />
        <div className="row">
          {this.state.games
            .filter(game => {
              //filter out only the searched-for items
              if (
                game.name
                  .toUpperCase()
                  .includes(this.state.searchTerm.toUpperCase())
              )
                return true;
              for (let i = 0; i < game.keywords.length; i++) {
                const keyword = game.keywords[i];
                if (
                  keyword
                    .toUpperCase()
                    .includes(this.state.searchTerm.toUpperCase())
                )
                  return true;
              }
              return false;
            })
            .map((game, i) => (
              <div className="col-xl-4 game-card col-lg-6 m-2 p-0">
                <div className="col-md pb-2 border m-0" key={i}>
              <Link className=" mx-0" to={"/games/" + game._id}>
                <h3 className="font-weight-bold my-1">{game.name}</h3>
                  <div className="card border-0 rounded-0 game-card">
                      <div className="row mx-0 mb-2 p-0">
                        <div className="col-6 p-0">
                          <img
                            className="rounded list-image img-fluid"
                            src={game.imgURL}
                            alt={game.name}
                          />
                        </div>
                        <div className="col-6 px-1 py-0 my-0 text-n-img ">
                          <Shiitake
                            lines={6}
                            throttleRate={200}
                            className="my-element text-dark"
                            tagName="p"
                          >
                            {game.description}
                          </Shiitake>
                          {/* Shiitake truncates text so it doesn't overflow. It's to get equally sized cards despite different length of descriptions! */}
                        </div>
                      </div>
                      
                    <div className="kw-list">
                      <div className="row mx-2">
                        {game.keywords.map((keyword, i) => (
                          <p
                            className="ell list-unstyled bg-secondary text-light m-0 px-1 border rounded"
                            key={i}
                          >
                            {keyword}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <hr className="mb-2"/>
                  </Link>
                  <div className="row mx-0 justify-content-around">
                      <div className="row my-auto mx-0">
                        <button onClick="" className="btn btn-light btn-hover btn-sm m-1 mt-0"><img height="20" className="" src={sThumbsDown} alt="thumb" /></button>
                        <button onClick="" className="btn btn-light btn-hover btn-sm m-1 mt-0"><img height="20" className="" src={sThumbsUp} alt="thumb" /></button>
                      </div>
                      <div className="row my-auto">
                        <button onClick="" className="btn btn-light btn-hover btn-sm m-0 p-0"><img className="heart" height="25" src={heart} alt=""/></button>
                      </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Gamelist;
