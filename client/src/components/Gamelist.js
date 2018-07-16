import React, { Component } from 'react';
import api from '../api';
import { Route, Link, Switch } from 'react-router-dom';
import Searchbar from "./Searchbar";



class Gamelist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      searchTerm: ""
    }
  }
  componentDidMount() {
    console.log("hiiiiiiii")
    api.getGames()
      .then(games => {
        console.log("GAMES:",games)
        this.setState({games})
      })
      .catch(err => console.log(err))
  }

  onSearchGames(searchVal) {
    this.setState({
      searchTerm: searchVal
    })
  }

  render() {  
    console.log("byeeee")
    return (
      <div className="Gamelist container">
        <h2>Games</h2>
        <Searchbar onSearchGames={this.state.searchTerm} />
        <div className="row border-danger border">
          {this.state.games.map((game, i) => 
            <div className="col-md m-2" key={i}>
               
                <Link to={"/games/" + game._id}>
                <button className="btn btn-success w-50 my-1"><h4 className="mb-0">{game.name}</h4></button>
                </Link>
              <div className="card border">
                <a href={game.gameURL}><img height="150" src={game.imgURL} alt="Click here to play"/></a>
                <p>{game.description}</p>
                <ul className="row">
                  {game.keywords.map((keyword, i) => <li className="list-unstyled bg-secondary text-light mx-1 px-1 border rounded" key= {i}>{keyword}</li>)}
                </ul>
              </div>
            </div>
            )}
        </div>
      </div>
    );
  }
}

export default Gamelist;
