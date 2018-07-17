import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../api';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// import './AddGame.css';
import "./App.css"



class AddGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      keywords: [],
      message: null,
      selectedOption: '',
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

  handleClick(e) {
    e.preventDefault()
    // console.log(this.state.name, this.state.description)
    let data = {
      name: this.state.name,
      keywords: this.state.keywords, //remember to FIX --> can you use the triple dots here maybe???
      description: this.state.description,
    }
    api.postGames(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          keywords: [],
          description: "",
          message: `Your game '${this.state.name}' has been created`
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
    const { selectedOption } = this.state;    //makes a variable of the current option/state
    return (
      <div className="AddGame">
        <h2>Add game</h2>

        <form>
          Name: <input type="text" value={this.state.name} /> <br/>
          Keywords: 
          {/* <input type="text" value={this.state.keywords} onChange={(e) => {this.handleKeywordSuggestion("keywords", e)}}  /> <br/> */}
          {/* this.state.keywords.map((c, i) => <li key={i}>{c.name}</li>) */}
          <Select
            name="multi-keyword-selector"
            value={selectedOption}
            onChange={this.handleChange}
            multi={true}
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ]}

          />
          Description <textarea value={this.state.description} cols="30" rows="10" ></textarea> <br/>
          
          <button onClick={(e) => this.handleClick(e)}>Upload game</button>
        </form>

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
