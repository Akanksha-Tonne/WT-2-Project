import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
import axios from "axios";
import Logo from "./logo2.JPG";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };
  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    console.log(event.target.value);
  };
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(event.target.value);
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted. Voila");
    let formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);
    axios
      .post("http://localhost:8000/login/", this.state)
      .then((response) => {
        console.log(response);
        window.location.href = "http://localhost:3000/home";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="row no-gutters">
        <div className="col left-side d-flex justify-content-center align-items-center no-gutters">
          <div className="image-background"></div>
        </div>
        <div className="col right-side d-flex justify-content-center align-items-center no-gutters">
          <form
            className="login-form justify-content-center align-center"
            style={{ textAlign: "center" }}
            onSubmit={this.handleFormSubmit}
          >
            <span className="login-heading">-Private Access-</span> <br />
            <br />
            <input
              type="text"
              className="input-boxes"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleUsernameChange}
              required
            />
            <br />
            <br />
            <input
              type="password"
              className="input-boxes"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handlePasswordChange}
              required
            />{" "}
            <br />
            <br />
            <input type="submit" value="Login" className="submit-button" />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
