import React, { Component } from 'react'
import Select from 'react-select'
import { Form } from 'reactstrap'
import api from '../api'
import "./App.css"
import styled from "styled-components"

export const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: grey;
  padding: 50px;
  border-radius: 0px 0px 5px 5px;
`

export const Button = styled.div`
  border-radius: 4px;
  padding: 10px;
  background-color: #409e2c;
  width: fit-content;
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid #86919c;
`

const Input = styled.input`
  display: flex;
  width: 100%;
  color: #495057;
  background-color: #fff;
  padding: 5px 10px;
  margin: 35px auto;
  border: 1px solid lightgray;
  border-radius: 4px;
`

const Textarea = styled.textarea`
  display: flex;
  width: 100%;
  flex-shrink: 0;
  color: #495057;
  background-color: #fff;
  padding: 5px 10px;
  margin: 35px auto;
  border: 1px solid lightgray;
  border-radius: 4px;
`

class AddGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      keywords: [],
      message: null,
      selectedOptions: '',
      file: null,
      allKeyWords: [],
    }
    this.initialState = this.state
  }

  async componentDidMount() {
    const games = await api.getGames()
    const keywordSet = new Set(games.map(game => game.keywords).flat())
    const allKeyWords = Array.from(keywordSet).map(keyword => ({ value: keyword, label: keyword }))
    this.setState({ allKeyWords })
  }

  handleChange(value) {
    this.setState(value)
  }

  handleSelectChange = (selectedOptions) => {
    const keywords = selectedOptions.map(option => option.value)
    this.setState({
      selectedOptions,
      keywords,
    })
  }


  handleClick = async (e) => {
    const { name, selectedOptions, description, file } = this.state
    e.preventDefault()
    await api.postGames({
      name,
      keywords: selectedOptions.map(option => option.value),
      description,
      file,
    })
    this.setState({
      ...this.initialState,
      message: `Your game '${name}' has been created`
    })
    setTimeout(() => this.setState({ message: null }), 2000)
  }

  render() {
    const { selectedOptions, allKeyWords } = this.state
    return (
      <Container>
        <h2><strong>ADD GAME</strong></h2>
        <p>
          As an admin, you can add new games to the website.
          Fill in the form below, and the game will be uploaded automatically.
        </p>
        <Form>
          <Input
            onChange={(e) => this.handleChange({ name: e.target.value })}
            type="text"
            placeholder="Name of the game"
          />
          <Input
            type="text"
            placeholder="URL to the game"
          />
          <Select
            value={selectedOptions}
            onChange={this.handleSelectChange}
            isMulti
            options={allKeyWords}
          />
          <Textarea
            onChange={(e) => this.handleChange({ description: e.target.value })}
            placeholder="Describe the game and its educational value."
          />
            Upload a picture with the new game. This will be the image shown on the front of the game.
            The image will be cropped to 600x400px. It's suggested you pick one of equal or bigger size to avoid pixelization.
          <Input
            onChange={(e) => this.handleChange({ file: e.target.files[0] })}
            type="file"
          />
          <Button onClick={this.handleClick}>
            Upload game!
          </Button>
        </Form>
      </Container>
    )
  }
}

export default AddGame
