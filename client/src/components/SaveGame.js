import React from "react";
// <img className="heart" height="25" src={heart} alt="save game"/>
import Select, { Creatable } from "react-select";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import api from "../api";
import "./SaveGame.css";


class SaveGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      user: null
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log("COMP UserInfo");
    // api.getProfile().then(user => {
    //   // console.log("helllloooooooooo", user);
    //   this.setState({
    //     user: user
    //   });
    // });
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedOption }, () => {
      this.addNewFav();
  });
    console.log("SEL", selectedOption);
  };

  addNewFav() {
    console.log("selectedOption", this.state.selectedOption)
    api.addGameToFav(this.state.selectedOption.value, this.props.gameId)
    .then(newFav => {
      console.log('SUCCESS! GAME SAVED')
      this.setState({
        selectedOption: "",
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
    // let favArray = this.state.user && this.state.user._favs;
    let favArray = this.props.favs;

    let dropDownFavs = [];
    let temp = [];
      favArray.forEach(curFav => {
        let curFavObj = { value: curFav._id, label: curFav.title };
        dropDownFavs.push(curFavObj);
        console.log("CURR", dropDownFavs.length);
      });
    const { selectedOption } = this.state;
    return (
      dropDownFavs.length >= 1 && (
        <Form className="game-lbl rounded">
          <FormGroup>
            <Select
              placeholder="Add to list..."
              className=""
              name="addGameDropDown"
              id="addGameDropDown"
              value={selectedOption}
              onChange={this.handleChange}
              options={dropDownFavs}
            />
            {/* <Button onClick={e => this.handleClick(e)}>add to fav</Button> */}
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