import React, { Component } from "react";

//super is Gamelist


class Searchbar extends Component {
    render() {
        return(
            <form action="" method="post">
                <input 
                placeholder="Search for edu-games..."
                value={this.props.searchTerm}
                onChange={this.props.onSearch} 
                className="w-100 p-1 m-1" 
                type="text" 
                name="searchbar" 
                id="searchbar"/>
            </form>
        )
    }

}


export default Searchbar;
