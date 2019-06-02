import React, { Component } from "react"
import api from "../../api";
import styled from "styled-components"

const Container = styled.div`
  background-color: lightblue;
`
const Favorites = styled.div`
  background-color: lightgrey;
  width: 100%;
  height: 150px;
`
const PopularGames = styled.div`
  background-color: lightgrey;
  width: 100%;
  height: 150px;
`
const RandomTagGames = styled.div`
  background-color: lightgrey;
  width: 100%;
  height: 150px;
`

class Home extends Component {
  constructor(props) {
    super(props)
    this.state= {
      games: {}
    }
  }
  componentDidMount() {
    api.getGames().then(games => this.setState({games}))
  }


  render() {
    const favs = ["fav1", "fav2", "fav3", "fav4", "fav5"]
    const popularGames = ["pop1", "pop2", "pop3", "pop4", "pop5"]
    const randomTagGames = ["pop1", "pop2", "pop3", "pop4", "pop5"]
    return (
      <Container>
        <Favorites games={favs}/>
        <PopularGames games={popularGames}/>
        <RandomTagGames games={randomTagGames}/>
      </Container>
    )
  }
}

export default Home