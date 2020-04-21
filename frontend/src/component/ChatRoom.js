import React, { Component } from "react";
import "./ChatRoom.css";
import NewGroup from "./NewGroup";
import ChatGroup from "./ChatGroup";
import axios from "axios";
import LocalStorageService from "../LocalStorageService";
import socketIOClient from "socket.io-client";
var utilities = require("../Utilities.json");
export default class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [],
      endpoint: "http://localhost:10001",
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
          <NewGroup />
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
      />
    ));
  }
  includeMe(userId) {
    return (userId = LocalStorageService.getUserID);
  }
  response = () => {
    const { groupList, endpoint } = this.state;
    const temp = groupList;
    const socket = socketIOClient(endpoint);
    socket.on("new-group", (newGroup) => {
      const isMember = newGroup.member.find(this.includeMe());
      temp.push({
        chatName: newGroup.chatName,
        chatRoomId: newGroup.chatRoom,
        isMember: isMember,
      });
      // alert(JSON.stringify(temp));
      this.setState({ groupList: temp });
      console.log(this.state.groupList);
      window.location.reload();
    });
  };
  async componentDidMount() {
    let userId = LocalStorageService.getUserID();
    await axios
      .get(utilities["backend-url"] + `/chatroom/${userId}`)
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
