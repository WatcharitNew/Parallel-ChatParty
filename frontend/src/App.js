import React from 'react';
import './App.css';
import LogIn from "./component/LogIn";
import Chat from "./component/Chat";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <LogIn />} />
        <Route path="/chat" component={() => <Chat />} />
      </Switch>
    </Router>
  );
}

export default App;
