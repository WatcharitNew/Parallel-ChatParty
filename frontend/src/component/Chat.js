import React, { Component } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import ChatRoom from "./ChatRoom";
import NavBar from "./NavBar";
export default class Chat extends Component {
  render() {
    return (
      <div className="Chat">
        <NavBar />
        <div className="Chat-header">
          <ChatRoom />
          <ChatMessage socket={this.props.socket} />
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
