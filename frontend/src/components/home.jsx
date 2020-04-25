import React, { Component } from "react";
import MainTemplate from "./mainTemplate";
import axios from "axios";
import Forecast from "./forecast";

class Home extends Component {
  render() {
    return <Forecast />;
  }
}

export default Home;
