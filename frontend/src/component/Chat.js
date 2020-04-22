import React, { Component } from "react";
import "./Chat.css";
import ChatMessage from "./ChatMessage";
import ChatRoom from "./ChatRoom";
import NavBar from "./NavBar";
export default class Chat extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <NavBar />
        </div>
        <div className="row h-100 Chat-Plane align-items-center">
          <div
            className="col-md-12 Chat-Block justify-content-center"
            align="center"
          >
            <div className="row">
              <div className="col-md-4">
                <ChatRoom socket={this.props.socket} />
              </div>
              <div className="col">
                <ChatMessage socket={this.props.socket} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
