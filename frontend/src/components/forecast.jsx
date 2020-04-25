import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Logo from "./logo2.JPG";
import MainTemplate from "./mainTemplate";
// import Graph from "./graph"
import ForecastVal from "./forecastval";
import { LineChart, PieChart } from "react-chartkick";
import "chart.js";

class Forecast extends Component {
  state = {
    data: {},
    graph_data: { "6mm": {}, "dust": {}, "10mm": {}, "20mm": {}, "30mm": {} },
  };

  avg_data = {};
  date_quant_cat = { "6mm": {}, "dust": {}, "10mm": {}, "20mm": {}, "30mm": {} };

  getData = (event) => {
    axios
      .get("http://localhost:8000/sales/")
      .then((response) => {
        this.avg_data = {};
        this.date_quant_cat = {
          "6mm": {},
          "dust": {},
          "10mm": {},
          "20mm": {},
          "30mm": {},
        };

        for (var i = 0; i < response.data.length; i++) {
          var date = response.data[i].sale_date.split("T")[0];
          if (!(date in this.date_quant_cat[response.data[i].stone_type.st])) {
            this.date_quant_cat[response.data[i].stone_type.st][date] =
              response.data[i].quantity;
          } else {
            this.date_quant_cat[response.data[i].stone_type.st][
              response.data[i].sale_date
            ] += response.data[i].quantity;
          }
          if (!(response.data[i].sale_date in this.avg_data)) {
            this.avg_data[response.data[i].sale_date] = {
              "6mm": 0,
              "dust": 0,
              "10mm": 0,
              "20mm": 0,
              "30mm": 0,
            };
            this.avg_data[response.data[i].sale_date][
              response.data[i].stone_type.st
            ] = response.data[i].quantity;
          } else {
            this.avg_data[response.data[i].sale_date][
              response.data[i].stone_type.st
            ] += response.data[i].quantity;
          }
        }
        this.setState({ data: this.avg_data, graph_data: this.date_quant_cat });
        // console.log(this.state.data)
        // console.log(this.date_quant_cat)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getData();
    setInterval(this.getData, 5000);
  }
  componentWillMount() {
    this.getData();
  }

  render() {
    // console.log(this.state);
    var data = [
      { name: "6mm", data: this.state.graph_data["6mm"] },
      { name: "dust", data: this.state.graph_data["dust"] },
      { name: "10mm", data: this.state.graph_data["10mm"] },
      { name: "20mm", data: this.state.graph_data["20mm"] },
      { name: "30mm", data: this.state.graph_data["30mm"] },
    ];
    console.log(data);
    return (
      <MainTemplate>
        {/* <Graph data={this.state.data}/> */}
        <LineChart data={data} />
        <br />
        <ForecastVal data={this.state.data} />
      </MainTemplate>
    );
  }
}
export default Forecast;
