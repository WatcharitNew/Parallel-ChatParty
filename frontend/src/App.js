import React, { Component } from "react";
import "./App.css";
import LogIn from "./component/LogIn";
import Chat from "./component/Chat";
import { Route, Switch, Router } from "react-router-dom";
import socketIOClient from "socket.io-client";
import history from "./history";
var utilities = require("./Utilities.json");

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient(utilities["backend-url"] + ":10001"),
    };
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <LogIn socket={this.state.socket} />}
          />
          <Route
            path="/chat"
            component={() => <Chat socket={this.state.socket} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
