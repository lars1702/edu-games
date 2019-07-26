import React from "react"
// import heart
import CreatableSelect from 'react-select/creatable';
import api from "../api"
import "./SaveGame.css"
import styled from "styled-components"

const MessageBox = styled.div`
  margin: 0;
  background-color: lightyellow;
  border-radius: 4px;
`

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
})


class SaveGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: "",
      message: null,
      isLoading: false,
      value: undefined,
      options: this.props.favs.map(fav => ({ value: fav._id, label: fav.title })),
    }
  }
  
  saveCount = 0
  handleChange = async (selectedOption) => {
    console.log('DEBUG - selectedOption:', selectedOption)
    const setMsgNull = () => this.setState({ message: null })

    await api.addGameToFav(selectedOption.value, this.props.gameId) // the only important part
    this.saveCount+=1
    this.setState({
      message: `${this.saveCount} games saved`,
      value: selectedOption.value, //IS THIS THE SAME????????????
    })
    setTimeout(setMsgNull, 2000)
  }

  handleCreate = async (inputValue) => {
    this.setState({ isLoading: true })
    console.log('DEBUG - inputValue:', inputValue)
    await api.addFav(inputValue)
    await api.addGameToFav(inputValue, this.props.gameId)
    setTimeout(() => {
      const newOption = createOption(inputValue)
      this.setState({
        isLoading: false,
        options: [...this.state.options, newOption],
        value: newOption,
      })
    }, 1000)
  }


  render() {
    console.log('DEBUG - RENDER SAVEGAME:', this.props)
    const { isLoading, options, value } = this.state
    return (
      ! this.state.message
      ?
        <CreatableSelect
          isDisabled={isLoading}
          isLoading={isLoading}
          placeholder="Add to list..."
          name="addGameDropDown"
          id="addGameDropDown"
          onChange={this.handleChange}
          options={options}
          value={value}
        />
      :
        <MessageBox> {this.state.message} </MessageBox>
    )
  }
}

export default SaveGame
