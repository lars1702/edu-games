import React, { Component } from "react";
import api from "../api";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddGame from "./AddGame";
import NewList from "./NewList";
import { Container, Row, Col } from 'reactstrap';



class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {}
//     };
//   }

//   componentDidMount() {
//     console.log("COMP PROFILE");
//     api.getProfile().then(user => {
//       this.setState({
//         user: user
//       });
//     });
//   }
  render() {
    console.log("RENDER");
    return (
      <Row className="Profile ">
          <Col className="mr-auto px-5 border" md="6" lg="5"><NewList/></Col>
          <Col className="ml-auto px-5 border" md="6" lg="5"><AddGame /></Col>
      </Row>
    );
  }
}

export default Profile;
