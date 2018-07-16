import React, { Component } from "react";
import api from "../api";

//super is Gamelist


class Searchbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchVal: "Hello"
      };
    }

    render() {
        let searchValue = this.state.searchVal
        return(
            <form action="" method="post">
                <input 
                value={searchValue}
                onChange={this.props.onSearchGames} 
                className="w-100 p-1 m-1" 
                type="text" 
                name="searchbar" 
                id="searchbar"/>
            </form>
        )
    }

}


export default Searchbar;
