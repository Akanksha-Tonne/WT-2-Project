import React, { Component } from "react";
import axios from "axios";
import "./displaySaleLogs.css";
import MainTemplate from "./mainTemplate";
import { Link } from "react-router-dom";
class DisplaySaleLogs extends Component {
  state = {
    data: [],
  };
  refreshData() {
    axios
      .get("http://localhost:8000/sales/")
      .then((response) => {
        // console.log(response.data);
        // console.log(response);
        this.setState({ data: response.data });
        console.log(this.state.data, "Hello world");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount = () => {
    this.refreshData();
  };
  componentWillMount = () => {
    this.refreshData();
  };
  renderData = () => {
    return this.state.data.map((item) => {
      console.log(
        item.id,
        item.stone_type.st,
        item.v_num.num,
        item.quantity,
        item.delivery_worker,
        item.desiel_spent,
        item.sale_date
      );
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.sale_date}</td>
          <td>{item.stone_type.st}</td>
          <td>{item.v_num.num}</td>
          <td>{item.quantity}</td>
          <td>{item.delivery_worker}</td>
          <td>{item.desiel_spent}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <MainTemplate>
        <div className="table-body">
          <span className="title">Sale Logs</span>
          <Link to="/addsalelog">
            <button className="">Add SaleLogs</button>
          </Link>
          <table>
            <thead>
              <tr>
                <th>Sl. NO</th>
                <th>Date</th>
                <th>Stone Type</th>
                <th>Vehicle No</th>
                <th>
                  Quantitiy <br />
                  (in Brass)
                </th>
                <th>Delivery Executive</th>
                <th>Diesel Spent</th>
              </tr>
            </thead>
            <tbody>{this.renderData()}</tbody>
          </table>
        </div>
      </MainTemplate>
    );
  }
}

export default DisplaySaleLogs;
