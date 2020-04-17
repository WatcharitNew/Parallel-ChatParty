import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "./LogIn.css";
export default class LogIn extends Component {
  render() {
    return (
      <div className="LogIn">
        <div className="LogIn-header">
          <div className="LogIn-card" align="center">
            <div className="LogIn-title">Log In</div>
            <div className="LogIn-text">Enter your name</div>
            <form
              onSubmit={() => {
                alert(document.getElementById("Name").value);
              }}
            >
              <input
                className="LogIn-input"
                id="Name"
                maxLength="15"
                required
              />
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#8BD88A" }}
                className="LogIn-button"
              >
                Enter
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
