import React, { Component } from "react";
import { Button } from "@material-ui/core";
import "./LogIn.css";
import LocalStorageService from "../LocalStorageService";
import axios from "axios";
export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
    };
  }

  gotoChat = () => {
    LocalStorageService.setUserName(this.state.userName);
    axios.post().then();
    window.location.href = "/chat";
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
