import React from "react";
import SaveGame from "../../SaveGame"
import TagList from "../TagList"
import { withRouter } from "react-router-dom"
import {
  ContainerInner,
  Description,
  Container,
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
    return (
      <Container>
        <ContainerInner onClick={this.handleClick}>
          <Image src={game.imgURL} alt={game.name} />
          <Description description={game.description}/>
        </ContainerInner>
        <TagList keywords={game.keywords} />
        <SaveGame gameId={game._id} favs={favs} />
      </Container>
    )
  }
}

export default withRouter(GameCard);

