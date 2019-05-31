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
    api
      .getGames()
      .then(games => {
        this.setState({ games });
      })
  }
  handleImgChange(e) {
    this.setState({
      file: e.target.files[0]
    })
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value
    })
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
    let data = {
      name: this.state.name,
      keywords: this.state.keywords,
      description: this.state.description,
      file: this.state.file,
    }
    api.postGames(data)
    .then(addedGame => {
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
      <div className="AddGame container col-sm-9 col-lg-6 col-xl-4">
        <h2 className=" mb-2 mt-5">Add game</h2>
        <p className="py-3 card bg-warning">Here you can add a new game to the website! To host a new game we will need some information about the game. Fill in the form below, and we'll do the rest.</p>
        <Form className=" border rounded p-3">
        <FormGroup>
          <Label className="mx-1 row" for="gameName">Name</Label>
          <Input onChange={(e)=>this.handleNameChange(e)} type="text" name="gameName" id="gameName" placeholder="Name of the game" />
        </FormGroup>
        <FormGroup>
          <Label className="mx-1 row" for="gameUrl">URL</Label>
          <Input type="text" name="gameUrl" id="gameUrl" placeholder="URL to the game" />
        </FormGroup>
        <FormGroup>
          <Label className="mx-1 row" for="keywordSelectMulti">Keywords</Label>
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
          <Label className="mx-1 row" for="gameDescription">Game description</Label>
          <Input onChange={(e)=>this.handleDescriptionChange(e)} placeholder="How is the game played & how is it educational?" type="textarea" name="gameDescription" id="gameDescription" />
        </FormGroup>
        <hr/>
        <FormGroup className=" w-75 rounded">
          <Label for="cloudUpload" className="mx-1 row text-align-left mr-auto">Picture upload</Label>
          <Input onChange={(e)=>this.handleImgChange(e)} type="file" name="cloudUpload" id="cloudUpload" /> {/* ONLY THIS LINE IS REPLACED */}
          <FormText color="muted">
            Upload a picture with the new game. This will be the image shown on the front of the game.
            The image will be cropped to 600x400px. It's suggested you pick one of equal or bigger size to avoid pixelization.
          </FormText>
        </FormGroup>
        <hr/>
        <Button success size="lg" onClick={(e) => this.handleClick(e)}>Upload game!</Button>
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
