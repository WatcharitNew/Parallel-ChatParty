import React, { Component } from "react";
import "./ChatRoom.css";
import NewGroup from "./NewGroup";
import ChatGroup from "./ChatGroup";
import axios from "axios";
import SessionStorageService from "../SessionStorageService";
import socketIOClient from "socket.io-client";
var utilities = require("../Utilities.json");
export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [],
      endpoint: utilities["backend-url"] + ":10001",
    };
  }
  render() {
    return (
      <div className="ChatRoom-card" align="center">
        <div className="ChatRoom-title">Chatroom</div>
        <div className="ChatGroup-area" align="center">
          {this.displayAllGroup()}
        </div>
        <div className="NewGroup-area">
          <NewGroup socket={this.props.socket} />
        </div>
      </div>
    );
  }
  displayAllGroup() {
    return this.state.groupList.map((item) => (
      <ChatGroup
        key={item.chatRoomId}
        id={item.chatRoomId}
        title={item.chatName}
        data={item}
        socket={this.props.socket}
      />
    ));
  }
  response = () => {
    const { groupList, endpoint } = this.state;
    const id = SessionStorageService.getUserID();
    const temp = groupList;
    this.props.socket.on("new-group", (newGroup) => {
      const isMember = newGroup.member.indexOf(id) != -1;
      temp.push({
        chatName: newGroup.chatName,
        chatRoomId: newGroup.chatRoom,
        isMember: isMember,
      });
      this.setState({ groupList: temp });
      console.log(this.state.groupList);
    });
  };
  async componentDidMount() {
    let userId = SessionStorageService.getUserID();
    await axios
      .get(utilities["backend-url"] + ":10000" + `/chatroom/${userId}`)
      .then((response) => {
        switch (response.status) {
          case 200:
            const groupList = response.data;
            this.setState({ groupList: groupList });
            break;
          default:
            console.log("Status code is " + response.status);
        }
      });
    this.response();
  }
}
