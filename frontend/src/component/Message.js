import React, { Component } from "react";
import "./Message.css";
import MessageAnnounce from "./MessageAnnounce";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import socketIOClient from 'socket.io-client';

export default class Message extends Component {
  constructor() {
    super();
    this.state = {
      message: [],
      endpoint: "http://localhost:10001", // เชื่อมต่อไปยัง url ของ realtime server
    };
  }

  componentDidMount = () => {
    this.response();
    console.log("begin");
  }


  response = () => {
    alert("hello");
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      temp.push(messageNew);
      this.setState({ message: temp });
      console.log(temp);
    })
  }

  displayAllMessage = () => {
    return this.state.message.map((msg,idx)=>(
      <div>
        <MessageLeft sender={"Test"} text={msg} time={"11.59 PM"} />
      </div>
    ));
  }
  
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
