import React from "react";
// <img className="heart" height="25" src={heart} alt="save game"/>
import Select, { Creatable } from "react-select";
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




  render() {
    let favArray = this.props.favs;

    let dropDownFavs = [];
    favArray.forEach(curFav => {
      let curFavObj = { value: curFav._id, label: curFav.title };
      dropDownFavs.push(curFavObj);
      console.log("CURR", dropDownFavs.length);
    });
    return (
      dropDownFavs.length >= 1 && (
        <Form className="game-lbl rounded">
          <FormGroup>
            <Select
              placeholder="Add to list..."
              className=""
              name="addGameDropDown"
              id="addGameDropDown"
              onChange={this.handleChange}
              options={dropDownFavs}
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
