import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Table extends React.Component {
  state = {
    data: []
  };
  updateTable = (event) => {
    var list = []
    list.push(this.props.h);
    list.push(this.props.r);
    this.setState({ data: list })
  }
  componentDidMount() {
    var self = this
    self.updateTable();
    setInterval(function () { self.updateTable() }, 1000)
  }
  render() {
    console.log(this.state.data)
    return (
      <table>
        <tbody>
          {
            this.state.data.map((numList, i) => (
              <tr key={i}>
                {
                  numList.map((num, j) =>
                    <td key={j}>{num}</td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default Table;