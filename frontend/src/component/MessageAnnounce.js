import React, { Component } from "react";
export default class MessageAnnounce extends Component {
    render() {
    return (
      <div className="Message-announce-wrap">
        <div className="Message-announce-text">{this.props.label}</div>
      </div>
    );
  }
  componentDidMount() {}
}
