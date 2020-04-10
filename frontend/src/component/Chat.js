import React, { Component } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
export default class Chat extends Component {
  render() {
    return (
      <div className="Chat">
        <div className="Chat-header">
          <div className="Chat-chatroom-card">
            <div className="Chat-chatroom-title">Chatroom</div>
          </div>
          <ChatMessage />
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
