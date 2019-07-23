import React from "react";
import SaveGame from "../../SaveGame"
import TagList from "../TagList"
import { withRouter } from "react-router-dom"
import {
  Description,
  Container,
  GameTitle,
  Image,
} from "./components"

class GameCard extends React.Component {
  handleClick = () => {
    const { game, history } = this.props
    history.push("/games/" + game._id)
  }

  render() {
    //check for user login and if user has favorites.
    //Then conditionally render SaveGame if these exist
    const { game, favs } = this.props
    console.log('DEBUG - game:', game)
    return (
      <Container>
        <Image onClick={this.handleClick} src={game.imgURL}/>
        <GameTitle>{game.name}</GameTitle>
        <TagList keywords={[...new Set(game.keywords)]} />
        <Description description={game.description}/>
        <SaveGame gameId={game._id} favs={favs} />
      </Container>
    )
  }
}

export default withRouter(GameCard)

