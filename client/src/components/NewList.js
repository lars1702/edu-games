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
        <div className="NewList container col-sm-12 col-lg-6 col-md-9">
          <div>
            <h2 className="mb-2 mt-5">{this.state.user.email}</h2>
            {/* <p>{this.state.user.name}</p> */}
            <hr/>
            <h4 className=" ml-3 text-left">
              Your playlists:
            </h4>
            {this.state.favs.map(fav => (
              <div className="card m-2 pt-2 pb-0 yellow-bg">
                <h3>{fav.title}</h3>
                <ul>
                  {fav._games.map((game, i) => (
                    <Link to={`/games/${game._id}`}>
                      <button className="btn btn-success text-dark grey-bg font-weight-bold col-md-4 col-sm-8 my-1 mr-1" ><li className="list-unstyled">{game.name}</li></button>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
            <hr className="w-25"/>
            <Form className="col-lg-9 col-md-9">
              <Label for="addFavForm" className="mb-0 pb-0 text-left mr-auto row mx-0">Name of new list:</Label>
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
