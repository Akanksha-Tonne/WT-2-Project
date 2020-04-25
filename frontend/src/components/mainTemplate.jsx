import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCopy,
  faAddressBook,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./mainTemplate.css";
import leaf from "./leaf.JPG";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./login";
import { Link } from "react-router-dom";

class MainTemplate extends Component {
  // state = {  }
  render() {
    return (
      <div className="wrapper">
        <div className="side-panel">
          <div className="title">
            <img src={leaf} alt="leaflogo" />
            <span style={{ textAlign: "center" }}>
              <span style={{ fontSize: "20px" }}>A R</span>
              <br />
              Stone Crushers
            </span>
          </div>
          <ul>
            <li>
              <a href="#" className="side-panel-icons">
                <FontAwesomeIcon className="fas" icon={faUser} /> Customer
                Details
              </a>
            </li>
            <li>
              <Link to="/displayworkers" className="side-panel-icons">
                <FontAwesomeIcon className="fas" icon={faUserCircle} /> Employee
                Details
              </Link>
            </li>
            <li>
              <Link to="/dispalysalelogs" className="side-panel-icons">
                <FontAwesomeIcon className="fas" icon={faCopy} /> Sale Logs
              </Link>
            </li>
            <li>
              <a href="#" className="side-panel-icons">
                <FontAwesomeIcon className="fas" icon={faAddressBook} />{" "}
                Expenditure
              </a>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className="header">
            <div className="nav-items-l">
              <Link to="/home">Home</Link>
            </div>
            <div className="nav-items-r1">
              <a href="#"></a>
            </div>
            <div className="nav-items-r2">
              <Link to="/login">Logout</Link>
            </div>
          </div>
          <div className="info">{this.props.children}</div>
          <div className="footer">
            © 2020 Copyright:
            <a href="https://google.com/"> arcreators.com</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainTemplate;
