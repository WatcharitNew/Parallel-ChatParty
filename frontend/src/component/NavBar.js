import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import "./NavBar.css";
import SessionStorageService from "../SessionStorageService";
import history from "../history";
export default class NavBar extends Component {
  logOut = () => {
    SessionStorageService.checkOut();
    history.push("/");
    // window.location.href = "/";
  };
  render() {
    return (
      <div className="NavBar-tab">
        <div className="NavBar-title">ChatRoom</div>
        <div className="NavBar-userName">
          {SessionStorageService.getUserName()}
        </div>
        <IconButton
          className="NavBar-logOut"
          onClick={(e) => {
            this.logOut();
          }}
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
      </div>
    );
  }
}
