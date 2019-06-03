import React, { Component } from "react"
import api from "../api"
import "./Gamelist.css"
import Searchbar from "./Searchbar"
import GameCard from "./Gamelist/GameCard"


class Gamelist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      searchTerm: "",
      favs: []
    }
  }
  componentDidMount() {
    api.getGames()
    .then(games => 
      this.setState({ games })
    ).catch(err => console.error(err))
    api.getMyFavs().then(favs => this.setState({ favs }))
  }

  handleSearch(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  gameFilter = (game) => {
    const st = this.state.searchTerm.toUpperCase()
    if (game.name.toUpperCase().includes(st))
      return true
    for (let i = 0; i < game.keywords.length; i++) {
      const keyword = game.keywords[i]
      if (keyword.toUpperCase().includes(st))
        return true
    }
    return false
  }

  render() {
    return (
      <div className="Gamelist container">
        <h2 className=" mb-2 mt-5 font-weight-bold">Games</h2>
        <Searchbar
          className="rounded"
          onSearch={this.handleSearch.bind(this)}
          searchTerm={this.state.searchTerm}
        />
        <div className="row">
          {this.state.games
          .filter(this.gameFilter)
          .map((game, i) => {
            return <GameCard game={game} i={i} key={i} favs={this.state.favs}/>
          })}
        </div>
      </div>
    )
  }
}

export default Gamelist
