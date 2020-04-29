import React, { Component } from "react";
import "./ChatGroup.css";
import socketIOClient from "socket.io-client";
import SessionStorageService from "../SessionStorageService";
import { Button } from "@material-ui/core";
var utilities = require("../Utilities.json");
export default class ChatGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatName: this.props.data.chatName,
      chatRoomId: this.props.data.chatRoomId,
      isMember: this.props.data.isMember,
      endpoint: utilities["backend-url"] + ":10001",
      socket: this.props.socket,
      selected: false,
    };
  }
  joinGroup = () => {
    const { chatName, chatRoomId, isMember, endpoint } = this.state;
    let tmp = {
      chatRoom: chatRoomId,
      client: SessionStorageService.getUserID(),
    };
    this.props.socket.emit("join-group", tmp);
    this.setState({ isMember: true });
    alert(`You has joined ${chatName}`);
    console.log("join group!");
  };
  leaveGroup = () => {
    const { chatName, chatRoomId, isMember, endpoint } = this.state;
    let tmp = {
      chatRoom: chatRoomId,
      client: SessionStorageService.getUserID(),
    };
    this.props.socket.emit("leave-group", tmp);
    if (this.state.selected) {
      let clr = {
        chatRoom: 0,
        client: SessionStorageService.getUserID(),
      };
      console.log(clr);
      this.props.socket.emit("change-room-front", clr);
    }
    this.setState({ isMember: false, selected: false });
    alert(`You has left ${chatName}`);
    console.log("left group! now @" + SessionStorageService.getChatRoomID());
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
  onClickGroupName = () => {
    const { chatRoomId, endpoint } = this.state;
    let tmp = {
      chatRoom: chatRoomId,
      client: SessionStorageService.getUserID(),
    };
    this.props.socket.emit("change-room-front", tmp);
    // SessionStorageService.setChatRoomID(chatRoomId);
    console.log("change group to" + chatRoomId);
  };
  groupName = () => {
    if (this.state.isMember) {
      return (
        <a
          className="ChatGroup-name ChatGroup-nameClick"
          onClick={() => {
            this.onClickGroupName();
          }}
        >
          <span className="ChatGroup-nameClick">{this.state.chatName}</span>
        </a>
      );
    } else {
      return <a className="ChatGroup-name">{this.state.chatName}</a>;
    }
  };
  getRoom = () => {
    this.state.socket.on("change-room-back", (changeRoom) => {
      console.log(changeRoom);
      if (changeRoom.client === SessionStorageService.getUserID()) {
        SessionStorageService.setChatRoomID(changeRoom.chatRoom);
        this.setState({
          selected: changeRoom.chatRoom === this.state.chatRoomId,
        });
      }
    });
  };
  render() {
    return (
      <div
        className={this.state.selected ? "ChatGroup-cardA" : "ChatGroup-cardB"}
      >
        {this.groupName()}
        {this.groupBtn(this.state.chatName)}
      </div>
    );
  }
  componentDidMount() {
    this.getRoom();
  }
}
