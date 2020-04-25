import React, { Component } from "react";
import MainTemplate from "./mainTemplate";
import "./addWorker.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
class AddWorker extends Component {
  state = {
    data: {
      name: "",
      gender: "f",
      title: "",
      date_of_joining: "",
      mobile: "",
      aadhar_number: "",
      salary: "",
      photo: null,
    },
    errorMessage: "",
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.data);
    let formData = new FormData();
    for (let property in this.state.data) {
      formData.append(property, this.state.data[property]);
      console.log(property, "=>", this.state.data[property]);
    }
    axios({
      url: "http://localhost:8000/worker/",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        console.log(res.status);
        this.setState({ errorMessage: "Uploaded" });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ errorMessage: err.response.data });
      });
  };
  handleChange = (event) => {
    console.log("Called");
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
    console.log(this.state);
  };
  handleFileUpload = (event) => {
    console.log("Done");
    this.setState({
      data: { ...this.state.data, photo: event.target.files[0] },
    });
  };
  getErrorMessageStyle = () => {
    console.log(this.state.errorMessage);
    let styleObject = { display: "none" };
    if (this.state.errorMessage != "") {
      styleObject = {
        width: "300px",
        color: "red",
        fontSize: "12px",
        lineHeight: "15px",
        border: "solid 0.5px red",
      };
      if (this.state.errorMessage === "Uploaded") {
        styleObject = {
          width: "300px",
          color: "green",
          fontSize: "12px",
          lineHeight: "15px",
          border: "solid 0.5px green",
        };
      }
    }
    return styleObject;
  };
  render() {
    return (
      <MainTemplate>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <span className="form-title">--Employee Details--</span>
            <br />
            <br />
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="name"
                      value={this.state.data.name}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>
                    <select
                      name="gender"
                      value={this.state.data.gender}
                      onChange={this.handleChange}
                      required
                      className="not-photo"
                    >
                      <option value="f">Female</option>
                      <option value="m">Male</option>
                      <option value="o">Other</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>Job Title:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="title"
                      value={this.state.data.title}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>

                <tr>
                  <td>Join Date:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="date"
                      name="date_of_joining"
                      value={this.state.data.date_of_joining}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mobile:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="mobile"
                      value={this.state.data.mobile}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Aadhaar Number:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="aadhar_number"
                      value={this.state.data.aadhar_number}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Salary:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="salary"
                      value={this.state.data.salary}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Photo: </td>
                  <td>
                    <input
                      className="photo"
                      type="file"
                      name="photo"
                      onChange={this.handleFileUpload}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="submit"
                      value="Add Employee"
                      className="submit-button"
                    />
                  </td>
                  <td>
                    <span
                      className="error-message"
                      style={this.getErrorMessageStyle()}
                    >
                      {this.state.errorMessage}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </MainTemplate>
    );
  }
}

export default AddWorker;
