import React, { Component } from "react";
import "./InputMessage.css";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import SessionStorageService from "../SessionStorageService";
import axios from "axios";
var utilities = require("../Utilities.json");
export default class InputMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      message: [],
      id: SessionStorageService.getUserID(),
      chatRoom:
        SessionStorageService.getChatRoomID().toString() === ""
          ? 1
          : SessionStorageService.getChatRoomID(),
      socket: props.socket,
      name: SessionStorageService.getUserName(),
    };
  }

  componentDidMount = () => {
    console.log(this.state.name);
    this.state.socket.on("please-login", () => {
      this.state.socket.emit("login", {
        userName: this.state.name,
      });
    });
    this.response();
  };

  response = () => {
    this.state.socket.on("change-room-back", (changeRoom) => {
      console.log(changeRoom);
      if (changeRoom.client === SessionStorageService.getUserID()) {
        this.setState({ chatRoom: changeRoom.chatRoom });
      }
    });
  };

  send = () => {
    const { input, id, chatRoom } = this.state;
    this.state.socket.emit("sent-message", {
      text: input,
      client: id,
      chatRoom: chatRoom,
    });
    this.setState({ input: "" });
    console.log("message sent!");
    axios
      .patch(
        utilities["backend-url"] +
          "/chatroom/read/" +
          this.state.chatRoom +
          "/" +
          SessionStorageService.getUserID(),
        {}
      )
      .then((response) => {
        switch (response.status) {
          case 200:
            console.log("already read!");
            break;

          // Other case
          default:
            console.log("Status code is " + response.status);
        }
      });
  };

  changeInput = (e) => {
    this.setState({ input: e.target.value });
  };
  render() {
    if (this.state.chatRoom == 0) {
      return (
        <div className="InputMessage-wrap">
          <input
            className="InputMessage-input"
            id="InputMessage"
            maxLength="30"
            required
            value={this.state.input}
            onChange={(e) => this.changeInput(e)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.send();
              }
            }}
            autoComplete="off"
            disabled
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#65B2FA" }}
            className="InputMessage-button"
            onClick={() => {
              this.send();
            }}
            disabled
          >
            Send
            <SendIcon />
          </Button>
        </div>
      );
    } else {
      return (
        <div className="InputMessage-wrap">
          <input
            className="InputMessage-input"
            id="InputMessage"
            maxLength="30"
            required
            value={this.state.input}
            onChange={(e) => this.changeInput(e)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.send();
              }
            }}
            autoComplete="off"
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#65B2FA" }}
            className="InputMessage-button"
            onClick={() => {
              this.send();
            }}
          >
            Send
            <SendIcon />
          </Button>
        </div>
      );
    }
  }
}
