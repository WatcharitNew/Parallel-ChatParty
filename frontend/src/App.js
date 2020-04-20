import React, { Component } from "react";
import "./App.css";
import LogIn from "./component/LogIn";
import Chat from "./component/Chat";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
    };
  }

  componentWillMount() {
    const socket = socketIOClient("http://localhost:10001");
		this.setState({socket});
	}
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={() => <LogIn socket={this.state.socket} />} />
          <Route path="/chat" component={() => <Chat socket={this.state.socket} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
