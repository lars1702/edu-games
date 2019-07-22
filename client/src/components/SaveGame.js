import React from "react";
// <img className="heart" height="25" src={heart} alt="save game"/>
import Select from "react-select";
import { Form, FormGroup } from "reactstrap";
import api from "../api";
import "./SaveGame.css";



class SaveGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      message: null,
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (selectedOption) => {
    api.addGameToFav(selectedOption.value, this.props.gameId)
    .then(newFav => {
      console.log('SUCCESS! GAME SAVED')
      this.setState({
        message: `Game saved`,
      })
      setTimeout(() => {
        this.setState({
          message: null
        })
      }, 2000)
    })
    .catch(err => {
      console.log('ERROR')
    })
  }


  dropDownFavs = () => {
    return this.props.favs.map(curFav =>
      ({
        value: curFav._id,
        label: curFav.title
      }))
  }

  render() {
    //TODO:
    // Remove the accursed bootstrap
    // render message of "save saved for like 2 sec when added"
    // then conditionally render "nothing in the list" if... well... yeah. Duh. 
    return (
      this.dropDownFavs.length && (
        <Form className="game-lbl rounded">
          <FormGroup>
            <Select
              placeholder="Add to list..."
              name="addGameDropDown"
              id="addGameDropDown"
              onChange={this.handleChange}
              options={this.dropDownFavs}
            />
          </FormGroup>
          <div className="rounded" style={{
            margin: 0,
            backgroundColor: "lightyellow",
            display: this.state.message ? "block" : "none"
          }}>
            {this.state.message}
          </div>
        </Form>
      )
    );
  }
}

export default SaveGame;
