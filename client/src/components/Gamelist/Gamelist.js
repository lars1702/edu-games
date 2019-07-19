import React, { Component } from "react"
import api from "../../api"
import Searchbar from "../Searchbar"
import GameCard from "./GameCard/GameCard"
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin: 0 auto;
  @media (min-width: 576px) {max-width: 540px;} /*Order matters here*/
  @media (min-width: 768px) {max-width: 720px;}
  @media (min-width: 992px) {max-width: 960px;}
  @media (min-width: 1200px) {max-width: 1140px;}
`

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 30px;
`

const Games = styled.div`
  display: flex;
  margin-top: 35px;
  flex-wrap: wrap;
  justify-content: center;
`

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

  searchFilter = (game) => {
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
      <Container>
        <Title>Games</Title>
        <Searchbar
          onSearch={this.handleSearch.bind(this)}
          searchTerm={this.state.searchTerm}
        />
        <Games>
          {this.state.games
          .filter(this.searchFilter)
          .map((game, i) =>
            <GameCard game={game} i={i} key={i} favs={this.state.favs}/>
          )}
        </Games>
      </Container>
    )}
}

export default Gamelist
