import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "./LogIn.css";
import LocalStorageService from "../LocalStorageService";
import axios from "axios";
var utilities = require("../Utilities.json");
export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
    };
  }

  gotoChat = () => {
    LocalStorageService.setUserName(this.state.userName);
    axios
      .post(utilities["backend-url"] + "/user/login", {
        userName: this.state.userName,
      })
      .then(response => {
        switch (response.status) {
          // Created
          case 201:
            console.log("already push");
            const id = response.data.userId;
            LocalStorageService.setUserID(id);
            window.location.href = "/chat";
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
  }
  
  render() {
    return (
      <div className="LogIn">
        <div className="LogIn-header">
          <div className="LogIn-card" align="center">
            <div className="LogIn-title">Log In</div>
            <div className="LogIn-text">Enter your name</div>
              <input
                className="LogIn-input"
                maxLength="15"
                required
                onChange={(e)=>{
                  this.setState({userName: e.target.value});
                }}
                onKeyDown={e => {
                  if (e.keyCode === 13) {
                    this.gotoChat();
                  }
                }}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#8BD88A" }}
                className="LogIn-button"
                onClick={()=>this.gotoChat()}
              >
                Enter
              </Button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
