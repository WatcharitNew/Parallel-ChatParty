import React, { Component } from "react";
import "./ChatMessage.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import Message from "./Message";
import InputMessage from "./InputMessage";
import SessionStorageService from "../SessionStorageService";
export default class ChatMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: "Empty chat",
      socket: this.props.socket,
    };
  }
  closeChat() {
    let tmp = {
      chatRoom: 0,
      client: SessionStorageService.getUserID(),
    };
    this.props.socket.emit("change-room-front", tmp);

    console.log("close chat");
  }
  render() {
    return (
      <div className="ChatMessage-card">
        <div className="ChatMessage-title">
          {!this.state.chatName ? "Empty chat" : this.state.chatName}
          <Button
            color="secondary"
            className="ChatMessage-title-close"
            onClick={() => {
              this.closeChat();
            }}
          >
            <CloseIcon fontSize="large" />
          </Button>
        </div>
        <div className="ChatMessage-area">
          <Message socket={this.props.socket} />
        </div>
        <div className="ChatMessage-inputMessage-area">
          <InputMessage socket={this.props.socket} />
        </div>
      </div>
    );
  }
  getChatName() {
    this.state.socket.on("change-room-back", (changeRoom) => {
      console.log(changeRoom);
      if (changeRoom.client === SessionStorageService.getUserID()) {
        SessionStorageService.setChatRoomID(changeRoom.chatRoom);
        this.setState({ chatName: changeRoom.chatName });
      }
    });
  }
  componentDidMount() {
    this.getChatName();
  }
}
