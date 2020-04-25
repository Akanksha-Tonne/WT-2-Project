import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "./table";
import "./table.css"
class ForecastVal extends Component {
    state = {
        x: ["6mm", "dust", "10mm", "20mm", "30mm"],
        y: ["ud", "ud", "ud", "ud", "ud"],
        data: this.props.data
    };
    data = this.props.data;
    res = { "val": null, message: null };

    getData = (event) => {
        var keys = Object.keys(this.props.data);
        var len = keys.length;
        // console.log(this.props.data)
        // console.log(len)
        if (len < 7) {
            this.res.message = "Not enough data to forecast";
        }
        else {
            console.log(this.state.data)
            const sortObject = o => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
            var sorted = sortObject(this.data);
            var start = len - 7;
            console.log(start)
            this.res.val = { "6mm": 0, "dust": 0, "10mm": 0, "20mm": 0, "30mm": 0 }
            for (var i = start; i < len; i++) {
                this.res["val"]["6mm"] += this.props.data[keys[i]]["6mm"]
                this.res["val"]["dust"] += this.props.data[keys[i]]["dust"]
                this.res["val"]["20mm"] += this.props.data[keys[i]]["20mm"]
                this.res["val"]["10mm"] += this.props.data[keys[i]]["10mm"]
                this.res["val"]["30mm"] += this.props.data[keys[i]]["30mm"]
            }
            // console.log(this.res.val)
            this.res["val"]["6mm"] = (Math.round(this.res["val"]["6mm"] / 7 * 100) / 100).toFixed(2);
            this.res["val"]["dust"] = (Math.round(this.res["val"]["dust"] / 7 * 100) / 100).toFixed(2);
            this.res["val"]["20mm"] = (Math.round(this.res["val"]["20mm"] / 7 * 100) / 100).toFixed(2);
            this.res["val"]["10mm"] = (Math.round(this.res["val"]["10mm"] / 7 * 100) / 100).toFixed(2);
            this.res["val"]["30mm"] = (Math.round(this.res["val"]["30mm"] / 7 * 100) / 100).toFixed(2);
            // console.log(this.res.val)
            console.log(Object.values(this.res.val))
            this.setState({ y: Object.values(this.res.val) })
            console.log(this.state);
            this.res.message = "The forcasts are:"

        }
    }
    componentDidMount() {
        this.getData();
        var self = this;
        setInterval(function () { self.getData() }, 500);
    }
    render() {
        var style = {
            border: "1px solid #ccc"
        }
        var head = ["6mm", "dust", "10mm", "20mm", "30mm"]
        return (
            <div>{this.res.message}
                <div><Table style={style} h={["6mm", "dust", "10mm", "20mm", "30mm"]} r={this.state.y} /></div>
            </div>

        );
    }
}
export default ForecastVal;