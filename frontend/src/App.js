import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LogIn from "./component/LogIn";
import Chat from "./component/Chat";

function AppOld() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
function App() {
  return <Chat />;
}

export default App;
