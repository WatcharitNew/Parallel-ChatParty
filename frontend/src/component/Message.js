import React, { Component } from "react";
import "./Message.css";
import MessageAnnounce from "./MessageAnnounce";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
export default class Message extends Component {
  render() {
    return (
      <div>
        <MessageAnnounce label={"Unread messages"} />
        <MessageLeft sender={"Shiba"} text={"Lorem ipsum"} time={"1.11 PM"} />
        <MessageRight text={"Hello"} time={"2.11 PM"} />
        <MessageAnnounce label={"Smooth has joined"} />
        <MessageLeft sender={"Smooth"} text={"Hello World"} time={"5.49 PM"} />
        <MessageRight text={"See U"} time={"6.00 PM"} />
        <MessageLeft sender={"Smooth"} text={"Hello World"} time={"6.03 PM"} />
        <MessageLeft sender={"Smooth"} text={"Hello World"} time={"6.04 PM"} />
        <MessageLeft sender={"Smooth"} text={"Hello World"} time={"6.05 PM"} />
      </div>
    );
  }
  componentDidMount() {}
}
