import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home/Home';
import Gamelist from './Gamelist/Gamelist';
import AddGame from './AddGame';
import Login from './Login';
import Signup from './Signup';
import GameDetails from './GameDetails'
import api from '../api';
import logo from '../ef-logo.png';
import NewList from './NewList';
import styled from "styled-components"

const Header = styled.div`
  box-shadow: 0px 2px 3px -1px rgba(21, 87, 36, 0.4);
  background-color: #409e2c;
  color: white;
  a {
    color: white;
    padding: 0 20px;
  }
`

export const BG = styled.div`
  background: repeating-linear-gradient(45deg,#606dbc,#606dbc 50px,#465298 50px,#465298 100px);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: -1;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    api.loadUser()
  }

  handleLogoutClick() {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <BG/>
        <Header>
          <Link to="/"><img src={logo} className="app-logo" alt="logo" /></Link>
          <Link to="/games">Games</Link>
          {api.isLoggedIn() && <Link to="/upload">Upload Game</Link> }
          {api.isLoggedIn() && <Link to="/new-playlist">New playlist</Link> }
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
        </Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/games" component={Gamelist} />
          <Route exact path="/upload" component={AddGame} />
          <Route exact path="/new-playlist" component={NewList} />
          <Route path="/games/:id" component={GameDetails} />
          <Route path="/add-game" component={AddGame} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    )
  }
}

export default App;
