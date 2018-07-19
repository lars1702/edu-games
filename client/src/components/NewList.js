import React, { Component } from "react";
import api from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class NewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      favs: [],
      favInput: ""
    };
  }

  componentDidMount() {
    console.log("COMP newplay");
    api.getProfile().then(user => {
      console.log("helllloooooooooo", user);
      this.setState({
        user: user
      });
    });
    api.getMyFavs().then(favs => {
      this.setState({
        favs
      });
    });
  }

  handleClick(e) {
    e.preventDefault();
    let favTitle = this.state.favInput;
    api.addFav(favTitle).then((newFav) => {
      console.log([...this.state.favs, newFav])

      // this.setState({ 
      //   favs: [...this.state.favs, newFav]
      // });

      window.location = '/new-playlist';
    })
  }

  handlechange(e) {
    let favInput = e.target.value;
    this.setState({ favInput });
    console.log(favInput);
  }

  render() {
    console.log("renderrrr");
    return (
      this.state.user && (
        <div className="NewList container">
          <div>
            <h2>{this.state.user.email}</h2>
            <p>{this.state.user.name}</p>
            {this.state.favs.map(fav => (
              <div className="card m-2">
                <p>{fav.title}</p>
                <ul>
                  {fav._games.map((game, i) => (
                    <Link to={`/games/${game._id}`}>
                      <li className="">{game.name}</li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
            <Form>
              <Label for="addFavForm mb-0 pb-0">Name of new list:</Label>
              <FormGroup className="row mx-0">
                <Input
                  className="col-9"
                  type="text"
                  name="add favorite"
                  id="addFavForm"
                  placeholder="i.e: student's name / disability / game-genre"
                  onChange={e => this.handlechange(e)}
                />
                <Button
                  className="col-3"
                  onClick={e => this.handleClick(e)}
                  color="warning"
                  size="md"
                >
                  Add
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      )
    );
  }
}

export default NewList;
