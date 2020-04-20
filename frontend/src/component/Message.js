import React, { Component } from "react";
import "./Message.css";
import MessageAnnounce from "./MessageAnnounce";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import socketIOClient from "socket.io-client";
import LocalStorageService from "../LocalStorageService";

export default class Message extends Component {
  constructor() {
    super();
    this.state = {
      message: [],
      name: LocalStorageService.getUserName(),
      endpoint: "http://localhost:10001", // เชื่อมต่อไปยัง url ของ realtime server
    };
  }

  componentDidMount = () => {
    this.response();

    //for create chatRoom
    /*const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('create-group', {
      chatName: "Test1",
      client: LocalStorageService.getUserID()
    });

    socket.on("new-group", (groupNew) => {
      console.log(groupNew);
    });*/
  };

  response = () => {
    const { endpoint, message } = this.state;
    const temp = message;
    const socket = socketIOClient(endpoint);
    socket.on("new-message", (messageNew) => {
      console.log(messageNew);
      temp.push(messageNew);
      this.setState({ message: temp });
    });
  };

  displayAllMessage = () => {
    return this.state.message.map((msg, idx) => (
      <div key={idx}>
        {msg.userName === this.state.name ? (
          <MessageRight
            sender={msg.userName}
            text={msg.text}
            time={msg.createdTime}
          />
        ) : (
          <MessageLeft
            sender={msg.userName}
            text={msg.text}
            time={msg.createdTime}
          />
        )}
      </div>
    ));
  };

  render() {
    return (
      <div>
        <MessageAnnounce label={"Unread messages"} />
        <MessageLeft sender={"Shiba"} text={"Lorem ipsum"} time={"1.11 PM"} />
        <MessageRight text={"Hello"} time={"2.11 PM"} />
        {this.displayAllMessage()}
      </div>
    );
  }
  componentDidMount() {}
}
