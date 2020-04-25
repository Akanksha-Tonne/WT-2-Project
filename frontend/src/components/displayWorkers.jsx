import React, { Component } from "react";
import axios from "axios";
import MainTemplate from "./mainTemplate.jsx";
import "./displayWorkers.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { Link } from "react-router-dom";

class DisplayWorkers extends Component {
  state = {
    data: [],
  };
  refreshData = () => {
    axios
      .get("http://localhost:8000/worker/")
      .then((response) => {
        this.setState({ data: response.data });
        console.log("data received");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };
  componentWillMount = () => {
    console.log("did mount");
    this.refreshData();
  };
  componentDidMount = () => {
    this.refreshData();
  };
  getIcon = (mobile) => {
    for (let i = 0; i < this.state.data.length; ++i) {
      if (this.state.data.mobile === mobile) {
        if (this.state.data.gender === "f") return <FaFemale />;
        else return <FaMale />;
      }
    }
  };
  handleDelete = (aadhar) => {
    console.log("http://localhost:8000/worker/" + aadhar);
    axios
      .delete("http://localhost:8000/worker/" + aadhar)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
    this.refreshData();
  };
  renderData = () => {
    return (
      <div className="display-body">
        {this.state.data.map((item) => {
          return (
            <div key={item.id} className="cardw">
              <img
                src={"http://localhost:8000" + item.photo}
                alt={item.photo}
                height="150px"
                width="130px"
              />
              <div className="cardw-body">
                <span className="cardw-title">
                  {this.getIcon()}
                  {item.name}
                </span>
                <div className="cardw-text">
                  <ul>
                    <li>{item.title}</li>
                    <li>Phone: +91 {item.mobile}</li>
                    <li>Salary: {item.salary}</li>
                    <li>Aadhaar: {item.aadhar_number}</li>
                    <li>Join-Date: {item.date_of_joining}</li>
                  </ul>
                </div>
                <button
                  className="btnw"
                  onClick={() => {
                    console.log(item.aadhar_number);
                    this.handleDelete(item.aadhar_number);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return (
      <MainTemplate>
        <div className="add-template">
          <span className="page-title">Employees</span>{" "}
          <Link to="/addworker">
            <button className="add-button">Add Employee</button>
          </Link>
          {this.renderData()}
        </div>
      </MainTemplate>
    );
  }
}

export default DisplayWorkers;
