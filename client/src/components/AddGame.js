import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import "./App.css"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class AddGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      keywords: [],
      message: null,
      selectedOption: '',
      games: [],
      file: null
    }
  }

  componentDidMount() {
    console.log("componentdidmount");
    api
      .getGames()
      .then(games => {
        console.log("GAMES:", games);
        this.setState({ games });
      })
      .catch(err => console.log(err));
  }
  handleImgChange(e) {
    console.log('handleImgChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
    console.log(this.state.file)
  }

  handleNameChange(e) {
    console.log('handleNameChange', e.target.value);
    this.setState({
      name: e.target.value
    })
    console.log(this.state.name)
  }

  handleDescriptionChange(e) {
    console.log('descriptionchange', e.target.value);
    this.setState({
      description: e.target.value
    })
    console.log(this.state.description)
  }
  
  handleSelectChange = (selectedOption) => {
    if (selectedOption.length === 0) {
      this.setState({ 
        selectedOption,
        keywords: [] 
      });
    }
    else {
      this.setState({ 
        selectedOption,
        keywords: [...this.state.keywords, selectedOption[selectedOption.length-1].value] 
      });
    }    
  }
  
  
  handleClick(e) {
    e.preventDefault()
    // console.log(this.state.name, this.state.description)
    //we don't want the pic to be part of the data i think
    let data = {
      name: this.state.name,
      keywords: this.state.keywords,
      description: this.state.description,
      file: this.state.file,
    }
    api.postGames(data)
    .then(addedGame => {
      console.log('SUCCESS!')
      this.setState({
        name: "",
        keywords: [],
        description: "",
        message: `Your game '${this.state.name}' has been created`,
        file: null
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
    let games = this.state.games
    let dropDownKeyWords = []
    let temp = []
    games.forEach ((game)=> {
      game.keywords.forEach((kw, i) => {
        let kwObject = { value: kw, label: kw }
        if (!temp.includes(kw)) dropDownKeyWords.push(kwObject)
        temp.push(kw)
      })
    })

    const { selectedOption } = this.state;    //makes a variable of the current option/state
    return (
      <div className="AddGame">
        <h2>Add game</h2>

        <Form>
        <FormGroup>
          <Label for="gameName">Game name</Label>
          <Input onChange={(e)=>this.handleNameChange(e)} type="text" name="gameName" id="gameName" placeholder="Name of the game" />
        </FormGroup>
        <FormGroup>
          <Label for="keywordSelectMulti">Select Multiple Keywords</Label>
          <Select
            name="multi-keyword-selector"
            id="keywordSelectMulti"
            value={selectedOption}
            className=""
            onChange={this.handleSelectChange}
            multi={true}
            options={dropDownKeyWords}
          />
        </FormGroup>
        <FormGroup>
          <Label for="gameDescription">Game description</Label>
          <Input onChange={(e)=>this.handleDescriptionChange(e)} placeholder="Describe your game: how is it played, how is it educational" type="textarea" name="gameDescription" id="gameDescription" />
        </FormGroup>
        <FormGroup>
          <Label for="cloudUpload">Picture upload</Label>
          <Input onChange={(e)=>this.handleImgChange(e)} type="file" name="cloudUpload" id="cloudUpload" />
          <FormText color="muted">
            Upload a picture with the new game. This will be the image shown on the front of the game.
            The image will be cropped to 600x400px. It's suggested you pick one of equal or bigger size to avoid pixelization.
          </FormText>
        </FormGroup>
        <Button onClick={(e) => this.handleClick(e)}>Upload game</Button>
      </Form>

        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default AddGame;