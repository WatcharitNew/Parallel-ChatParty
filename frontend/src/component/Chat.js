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
            className="col-md-12 Chat-Block border border-danger justify-content-center"
            align="center"
          >
            <div className="row">
              <div className="col-md-4 border border-info">
                <ChatRoom />{" "}
              </div>
              <div className="col border border-info">
                <ChatMessage />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row" style={{ height: "auto", display: "flex" }}>
          <div className="col-md-3 col-sm-12 border">
            <div className="row">
              <ChatRoom />
            </div>
          </div>
        </div>
        */}
      </div>
    );
  }
  componentDidMount() {}
}
