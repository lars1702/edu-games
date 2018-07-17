import React, { Component } from 'react';
import api from '../api';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, Switch } from "react-router-dom";


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    api.getProfile()
    .then(user =>{
        this.setState({
            user: user
        })
    })
  }


  render() {                
    return (
      <div className="Home pt-4 container">
        <h2>Welcome to edu-fun!</h2>
        <h6 className="mt-0">Making learning fun (image of some smiling cartoon-animal)</h6>
        <div className="card bg-light py-2 ">
          <h5 className="font-weight-bold">
            New games
          </h5>
          <div className="d-flex justify-content-around pb-2">
              <div className="border w-100 ml-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mx-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mr-2">
                gamecard <br/> Component
              </div>
          </div>
        </div>


          <h1 className="text-left m-3">Featured:</h1>
          <hr className="m-3"/>
        <div className="card bg-light py-2 m-3">
          <div className="m-2 d-flex align-items-center">Games popular with <div className="bg-secondary text-light mx-2 px-1 border rounded">autism</div>
          </div> 
          <div className="d-flex justify-content-around pb-2">
              <div className="border w-100 ml-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mx-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mr-2">
                gamecard <br/> Component
              </div>
          </div>
        </div>
        <div className="card bg-light py-2 m-3">
          <div className="m-2 d-flex align-items-center">Games popular with <div className="bg-secondary text-light mx-2 px-1 border rounded">motor coordination skills</div>
          </div> 
          <div className="d-flex justify-content-around pb-2">
              <div className="border w-100 ml-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mx-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mr-2">
                gamecard <br/> Component
              </div>
          </div>
        </div>
        <div className="card bg-light py-2 m-3">
          <div className="m-2 d-flex align-items-center">Games popular with <div className="bg-secondary text-light mx-2 px-1 border rounded">executive functions</div>
          </div> 
          <div className="d-flex justify-content-around pb-2">
              <div className="border w-100 ml-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mx-2">
                gamecard <br/> Component
              </div>
              <div className="border w-100 mr-2">
                gamecard <br/> Component
              </div>
          </div>
        </div>
        <Link to="/games">
          <h2 className="btn btn-lg btn-success text-dark font-weight-bold">
            See all games
          </h2>
        </Link >
      </div>
    );
  }
}

export default Home;
