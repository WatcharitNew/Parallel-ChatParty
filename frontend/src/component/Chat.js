import React, { Component } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import ChatRoom from "./ChatRoom";
export default class Chat extends Component {
  render() {
    return (
      <div className="Chat">
        <div className="Chat-header">
          <ChatRoom />
          <ChatMessage />
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
