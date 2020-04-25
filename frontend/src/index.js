import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import AddWorker from "./components/addWorker.jsx";
import DisplayWorkers from "./components/displayWorkers.jsx";
import Login from "./components/login";
import DisplaySaleLogs from "./components/displaySaleLogs.jsx";
import SaleLogForm from "./components/addsalelog.jsx";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <AddWorker path="/addworker" component={AddWorker} />
        <Route path="/home" component={Home}></Route>
        <Route path="/displayworkers" component={DisplayWorkers}></Route>

        <Route path="/login" component={Login}></Route>
        <Route path="/dispalysalelogs" component={DisplaySaleLogs}></Route>
        <Route path="/addsalelog" component={SaleLogForm}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
