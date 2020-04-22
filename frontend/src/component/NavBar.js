import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import "./NavBar.css";
import LocalStorageService from "../LocalStorageService";
export default class NavBar extends Component {
  render() {
    return (
      // <nav class="navbar navbar-light bg-light">
      //   <a class="navbar-brand" href="#">
      //     Navbar
      //   </a>
      // </nav>

      <div className="NavBar-tab border border-succes">
        <div className="NavBar-title">ChatRoom</div>
        <div className="NavBar-userName">
          {LocalStorageService.getUserName()}
        </div>
        <IconButton
          className="NavBar-logOut"
          onClick={(e) => {
            alert("Logout");
          }}
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
      </div>
    );
  }
}
