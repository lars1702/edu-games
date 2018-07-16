import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './Home';
import Gamelist from './Gamelist';
import Profile from './Profile';
import AddGame from './AddGame';
import Login from './Login';
import Signup from './Signup';
import GameDetails from './GameDetails'
import api from '../api';
import logo from '../ef-logo.png';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
    api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {                
    return (
      <div className="App">
        <header className="App-header p-0">
          <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link> 
          <Link to="/games">Games</Link> 
          <Link to="/profile">Profile</Link> 
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link> }
          {!api.isLoggedIn() && <Link to="/login">Login</Link> }
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link> }
        </header>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/games" component={Gamelist} />
          <Route path="/games/:id" component={GameDetails} />
          <Route path="/add-game" component={AddGame} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route render={() => <h2>404</h2>} />
        </Switch>        
      </div>
    );
  }
}

export default App;
