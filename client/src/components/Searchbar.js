import React, { Component } from "react";
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => <FontAwesomeIcon size="lg" style={{marginRight: "10px"}} icon={faSearch}/>

const Input = styled.input`
  box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.3);
  border: none;
  width: 100%;
  padding: 8px 15px 8px 42px;
`

const Placeholder = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1em;
  color: darkgrey;
  pointer-events: none;
`

const Form = styled.form`
  position: relative;
  width: 80%;
  margin: 4 auto;
`

class Searchbar extends Component {
  render() {
    return(
      <Form action="" method="post">
        <Input
          value={this.props.searchTerm}
          onChange={this.props.onSearch}
          type="text"
          name="searchbar"
          id="searchbar"
        />
        <Placeholder>
          <Search/>
          {!this.props.searchTerm && <span>Search for games by title or keywords</span>}
        </Placeholder>
      </Form>
    )
  }
}


export default Searchbar;
