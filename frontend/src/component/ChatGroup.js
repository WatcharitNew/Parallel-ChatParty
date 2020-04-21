import React, { Component } from "react";
import "./ChatGroup.css";
import socketIOClient from "socket.io-client";
import LocalStorageService from "../LocalStorageService";
import { Button } from "@material-ui/core";

export default class ChatGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: this.props.data.chatName,
      chatRoomId: this.props.data.chatRoomId,
      isMember: this.props.data.isMember,
      endpoint: "http://localhost:10001",
    };
  }
  joinGroup = () => {
    const { chatName, chatRoomId, isMember, endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    let tmp = {
      chatRoom: chatRoomId,
      client: LocalStorageService.getUserID(),
    };
    socket.emit("join-group", tmp);
    this.setState({ isMember: true });
    alert(`You has joined ${chatName}`);
    console.log("join group!");
  };
  leaveGroup = () => {
    const { chatName, chatRoomId, isMember, endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    let tmp = {
      chatRoom: chatRoomId,
      client: LocalStorageService.getUserID(),
    };
    socket.emit("leave-group", tmp);
    this.setState({ isMember: false });
    alert(`You has left ${chatName}`);
    console.log("left group!");
  };
  groupBtn = (groupName) => {
    if (this.state.isMember) {
      return (
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#E26060", color: "white" }}
          className="ChatGroup-button"
          onClick={() => {
            this.leaveGroup();
          }}
        >
          Leave
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#60E2B3" }}
          onClick={() => {
            this.joinGroup();
          }}
          className="ChatGroup-button"
        >
          Join
        </Button>
      );
    }
  };
  render() {
    return (
      <div className="ChatGroup-card">
        <div className="ChatGroup-name">{this.state.chatName}</div>
        {this.groupBtn(this.state.chatName)}
      </div>
    );
  }
}
