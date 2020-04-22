import React, { Component } from "react";
import "./Message.css";
import MessageAnnounce from "./MessageAnnounce";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import SessionStorageService from "../SessionStorageService";
import axios from "axios";
var utilities = require("../Utilities.json");

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      name: SessionStorageService.getUserName(),
      socket: props.socket,
      chatRoom:
        SessionStorageService.getChatRoomID().toString() === ""
          ? 1
          : SessionStorageService.getChatRoomID(),
      ref: React.createRef(),
    };
  }

  componentDidMount = () => {
    console.log(this.state.name);
    this.state.socket.emit("login", {
      userName: this.state.name,
    });
    this.response();
    this.loadMessage();

    //for create chatRoom
    /*this.state.socket.emit('create-group', {
      chatName: "Test2",
      client: SessionStorageService.getUserID()
    });*/
  };

  loadMessage = () => {
    axios
      .get(utilities["backend-url"] + "/message/" + this.state.chatRoom)
      .then((res) => {
        console.log(res.data);
        this.setState({ message: res.data });
      });
  }

  response = () => {
    this.state.socket.on("new-message", (messageNew) => {
      if (messageNew.chatRoom === this.state.chatRoom) {
        const { message } = this.state;
        const temp = message;
        var tmpMsg = messageNew;
        console.log(messageNew);
        tmpMsg.type = 0;
        tmpMsg.senderName = messageNew.userName;
        temp.push(tmpMsg);
        this.setState({ message: temp }, () => {
          this.scrollToBottom();
        });
      }
    });

    this.state.socket.on("new-member", (memberNew) => {
      console.log(memberNew);
      if (memberNew.chatRoom === this.state.chatRoom) {
        const { message } = this.state;
        const temp = message;
        var tmpMember = memberNew;
        tmpMember.type = 1;
        tmpMember.text = memberNew.userName + " has joined";
        temp.push(tmpMember);
        this.setState({ message: temp }, () => {
          this.scrollToBottom();
        });
      }
    });

    this.state.socket.on("change-room-back", (changeRoom) => {
      console.log(changeRoom);
      if (changeRoom.client === SessionStorageService.getUserID()) {
        this.setState({chatRoom: changeRoom.chatRoom, message: []},()=>{
          this.loadMessage();
        });
      }
    });
  };

  displayAllMessage = () => {
    return this.state.message.map((msg, idx) => (
      <div key={idx}>
        {msg.type === 1 ? (
          <MessageAnnounce label={msg.text} />
        ) : msg.senderName === this.state.name ? (
          <MessageRight
            text={msg.text}
            time={msg.createdTime.substring(11, 16)}
          />
        ) : (
          <MessageLeft
            sender={msg.senderName}
            text={msg.text}
            time={msg.createdTime.substring(11, 16)}
          />
        )}
      </div>
    ));
  };

  scrollToBottom = () => {
    this.state.ref.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    
    return (
      <div>
        <MessageAnnounce label={"Unread messages"} />
        {this.displayAllMessage()}
        <div ref={this.state.ref} />
      </div>
    );
  }
  componentDidMount() {}
}
