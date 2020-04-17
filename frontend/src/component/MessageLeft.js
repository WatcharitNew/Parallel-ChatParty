import React, { Component } from "react";
export default class MessageLeft extends Component {
  render() {
    return (
      <div className="Message-left-wrap">
        <div className="Message-left-sender">{this.props.sender}</div>
        <div className="Message-left-text-wrap">
          <div className="Message-left-text">{this.props.text}</div>
          <div className="Message-left-time">{this.props.time}</div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
