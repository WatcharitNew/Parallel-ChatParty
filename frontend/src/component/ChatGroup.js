import React, { Component } from "react";
import "./ChatGroup.css";
import { Button } from "@material-ui/core";
export default class ChatGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.groupBtn = this.groupBtn.bind(this);
  }
  groupBtn(groupName) {
    if (this.props.data.isMember) {
      return (
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#E26060", color: "white" }}
          className="ChatGroup-button"
          onClick={(e) => {
            alert("You have left " + groupName);
          }}
        >
          Leave
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#60E2B3" }}
          onClick={(e) => {
            alert("You have joined " + groupName);
          }}
          className="ChatGroup-button"
        >
          Join
        </Button>
      );
    }
  }
  render() {
    return (
      <div className="ChatGroup-card">
        <div className="ChatGroup-name">{this.props.data.groupName}</div>
        {this.groupBtn(this.props.data.groupName)}
      </div>
    );
  }
}
