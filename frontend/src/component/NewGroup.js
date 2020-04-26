import React, { Component } from "react";
import "./NewGroup.css";
import { Button } from "@material-ui/core";
import socketIOClient from "socket.io-client";
import SessionStorageService from "../SessionStorageService";
var utilities = require("../Utilities.json");
export default class NewGroupCard extends Component {
  constructor(props) {
    super(props);

    this.state = { input: "", endpoint: utilities["backend-url"] + ":10001" };
  }
  changeInput = (e) => {
    this.setState({ input: e.target.value });
  };
  send = () => {
    const { endpoint, input } = this.state;
    if (!input) return;
    let tmp = {
      chatName: input,
      client: SessionStorageService.getUserID(),
    };
    this.props.socket.emit("create-group", tmp);
    this.setState({ input: "" });
    alert(tmp.chatName + " is created");
    console.log("new group sent!");
  };
  render() {
    return (
      <div className="NewGroup-wrap">
        <input
          className="NewGroup-input"
          id="NewGroup"
          placeholder="New Group"
          maxLength="30"
          required
          onChange={(e) => {
            this.changeInput(e);
          }}
          value={this.state.input}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.send();
            }
          }}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#8395F3", color: "white" }}
          className="NewGroup-button"
          onClick={() => {
            this.send();
          }}
        >
          Create
        </Button>
      </div>
    );
  }
}
