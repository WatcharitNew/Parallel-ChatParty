import React, { Component } from "react";
import "./ChatMessage.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
export default class ChatMessage extends Component {
  render() {
    return (
      <div className="ChatMessage-card" align="center">
        <div className="ChatMessage-title">
          ChatMessage
          <Button
            color="secondary"
            className="ChatMessage-title-close"
            onClick={() => {
              alert("click close!");
            }}
          >
            <CloseIcon fontSize="large" />
          </Button>
        </div>
        <div className="ChatMessage-area">Hello</div>
      </div>
    );
  }
  componentDidMount() {}
}
