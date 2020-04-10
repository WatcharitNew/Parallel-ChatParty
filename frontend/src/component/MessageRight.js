import React, { Component } from "react";
export default class MessageRight extends Component {
  render() {
    return (
      <div className="Message-right-wrap">
        <div className="Message-right-text-wrap">
          <div className="Message-right-time">{this.props.time}</div>
          <div className="Message-right-text">{this.props.text}</div>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
