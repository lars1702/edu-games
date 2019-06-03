import React from "react";
import SaveGame from "../SaveGame"
import TagList from "./TagList"
import Shiitake from "shiitake"
import { Link } from "react-router-dom"


class GameCard extends React.Component {
  render() {
    const { game, i } = this.props
    return (
      <div className="col-xl-4 game-card col-lg-6 m-0 p-sm-0 p-md-1">
        <div className="rounded g-l-card col-md my-3 pb-2 border" key={i}>
          <Link className=" mx-0" to={"/games/" + game._id}>
            <h3 className="font-weight-bold my-1">{game.name}</h3>
            <div className="g-l-card card border-0 rounded-0 game-card">
              <div className="g-l-card row mx-0 p-0">
                <div className="g-l-card col-6 p-0">
                  <img
                    className="rounded list-image img-fluid"
                    src={game.imgURL}
                    alt={game.name}
                  />
                </div>
                <div className="g-l-card col-6 px-1 py-0 my-0 text-n-img ">
                  <Shiitake
                    lines={6}
                    throttleRate={200}
                    className="my-element text-dark"
                    tagName="p"
                  >
                    {game.description}
                  </Shiitake>
                </div>
              </div>
              <TagList game={game} />
            </div>
          </Link>
          <div className="w-50 mx-auto">
          <SaveGame gameId={game._id} favs={this.props.favs} />
          </div>
        </div>
      </div>
    );
  }
}

export default GameCard;
