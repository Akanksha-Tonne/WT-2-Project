import React, { Component } from "react";
import axios from "axios";
import MainTemplate from "./mainTemplate";
import "./addWorker.css";
class SaleLogForm extends Component {
  state = {
    data: {
      vehicle: "",
      stonetype: "",
      quantity: "",
      delivery_worker: "",
      diesel_stock_name: "",
      desiel_spent: "",
      sale_bill: "",
    },
    vehicles: [],
    stonetypes: [],
    delivery_workers: [],
    diesel_stock_names: [],
    sale_bills: [],
    errorMessage: "",
  };
  handleChange = (event) => {
    console.log("Called");
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
    console.log(this.state);
  };

  componentWillMount = () => {
    this.getVehicles();
  };
  getsale_bill = () => {
    axios
      .get("http://localhost:8000/bills/")
      .then((response) => {
        this.setState({ sale_bills: response.data, errorMessaage: "Uploaded" });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  getdiesel_stock_name = () => {
    axios
      .get("http://localhost:8000/diesel_stocks/")
      .then((response) => {
        this.setState({ diesel_stock_names: response.data });
        console.log(response.data, "getdiesel_stock_name");
      })
      .catch((error) => {
        console.log(error.response);
      });
    this.getsale_bill();
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
      url: "http://localhost:8000/sales/",
      method: "POST",
      data: this.state.data,
    })
      .then((res) => {
        console.log(res.status);
        this.setState({ errorMessage: "" });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ errorMessage: err.status });
      });
  };
  handleChange = (event) => {
    console.log("Called", event.target.value, event.target.name);
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
    console.log(this.state);
  };

  getErrorMessageStyle = () => {
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
  getVehicles = () => {
    axios
      .get("http://localhost:8000/resources/")
      .then((response) => {
        this.setState({ vehicles: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
    this.getStoneTypes();
  };
  getStoneTypes = () => {
    axios
      .get("http://localhost:8000/stone_types/")
      .then((response) => {
        this.setState({ stonetypes: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
    this.getdelivery_workers();
  };
  getdelivery_workers = () => {
    axios
      .get("http://localhost:8000/worker/")
      .then((response) => {
        this.setState({ delivery_workers: response.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
    this.getdiesel_stock_name();
  };
  getVehiclesOption = () => {
    return this.state.vehicles.map((veh) => {
      return (
        <option value={veh} key={veh}>
          {veh}
        </option>
      );
    });
  };
  getStoneTypeOptions = () => {
    return this.state.stonetypes.map((stonetype) => {
      return (
        <option key={stonetype} value={stonetype}>
          {stonetype}
        </option>
      );
    });
  };

  getDelivery_worker_options = () => {
    return this.state.delivery_workers.map((w) => {
      return (
        <option key={w.name} value={w.name}>
          {w.name}
        </option>
      );
    });
  };
  getsale_billoption = () => {
    return this.state.sale_bills.map((sp) => {
      return (
        <option key={sp} value={sp}>
          {sp}
        </option>
      );
    });
  };
  getdiesel_stock_nameoptions = () => {
    console.log(this.state.diesel_stock_names);
    return this.state.diesel_stock_names.map((stock) => {
      return (
        <option key={stock} value={stock}>
          {stock}
          {console.log("hello")}
        </option>
      );
    });
  };

  render() {
    return (
      <MainTemplate>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <span className="form-title">--Sale Details--</span>
            <br />
            <br />
            <table>
              <tbody>
                <tr>
                  <td>Quantity:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="quantity"
                      value={this.state.data.quantity}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Vehicle:</td>
                  <td>
                    <select
                      name="vehicle"
                      value={this.state.data.vehicle}
                      onChange={this.handleChange}
                      required
                      className="not-photo"
                    >
                      {this.getVehiclesOption()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Delivery Executive:</td>
                  <td>
                    <select
                      name="delivery_worker"
                      value={this.state.data.delivery_worker}
                      onChange={this.handleChange}
                      required
                      className="not-photo"
                    >
                      {this.getDelivery_worker_options()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Stone Type:</td>
                  <td>
                    <select
                      name="stonetype"
                      value={this.state.data.stonetype}
                      onChange={this.handleChange}
                      required
                      className="not-photo"
                    >
                      {this.getStoneTypeOptions()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Sale Bill Id:</td>
                  <td>
                    <select
                      name="sale_bill"
                      value={this.state.data.sale_bill}
                      onChange={this.handleChange}
                      required
                      className="not-photo"
                    >
                      {this.getsale_billoption()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Diesel Stock Id:</td>
                  <td>
                    <select
                      name="diesel_stock_name"
                      value={this.state.data.diesel_stock_name}
                      onChange={this.handleChange}
                      required
                      className="not-photo"
                    >
                      {this.getdiesel_stock_nameoptions()}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Diesel Spent:</td>
                  <td>
                    <input
                      className="not-photo"
                      type="text"
                      name="desiel_spent"
                      value={this.state.data.desiel_spent}
                      onChange={this.handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="submit"
                      value="Add Sale Log"
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
        </div>
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
      </MainTemplate>
    );
  }
}

export default SaleLogForm;
