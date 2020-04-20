import React, { Component } from "react";
import "./ChatRoom.css";
import NewGroup from "./NewGroup";
import ChatGroup from "./ChatGroup";
export default class ChatRoom extends Component {
  render() {
    return (
      <div className="ChatRoom-card" align="center">
        <div className="ChatRoom-title">Chatroom</div>
        <div className="ChatGroup-area" align="center">
          <ChatGroup
            data={{ groupName: "ABCABCABCABCABCABCABCABC", isMember: false }} socket={this.props.socket}
          />
          <ChatGroup data={{ groupName: "EFG", isMember: false }} />
          <ChatGroup data={{ groupName: "HIJ", isMember: false }} />
          <ChatGroup data={{ groupName: "KLM", isMember: true }} />
          <ChatGroup data={{ groupName: "NOP", isMember: false }} />
          <ChatGroup data={{ groupName: "QRS", isMember: true }} />
          <ChatGroup data={{ groupName: "TUV", isMember: true }} />
          <ChatGroup data={{ groupName: "WX", isMember: false }} />
          <ChatGroup data={{ groupName: "YZ", isMember: true }} />
        </div>
        <div className="NewGroup-area">
          <NewGroup />
        </div>
      </div>
    );
  }
}
