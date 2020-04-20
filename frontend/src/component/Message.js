import React, { Component } from "react";
import "./Message.css";
import MessageAnnounce from "./MessageAnnounce";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import SessionStorageService from "../SessionStorageService";
import axios from 'axios';
var utilities = require("../Utilities.json");

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      name: SessionStorageService.getUserName(),
      socket: props.socket,
      chatRoom: 1,
    };
  }

  componentDidMount = () => {
    this.state.socket.emit("login", {
      userName: this.state.name
    });
    this.response();
    
    axios.get(utilities["backend-url"] + "/message/" + this.state.chatRoom).then(res => {
      console.log(res.data);
      //this.setState({message: res});
    })

    //for create chatRoom
    /*const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('create-group', {
      chatName: "Test1",
      client: SessionStorageService.getUserID()
    });

    socket.on("new-group", (groupNew) => {
      console.log(groupNew);
    });*/
  };

  response = () => {
    const { endpoint, message } = this.state;
    const temp = message;

    this.state.socket.on("new-message", (messageNew) => {
      var tmpMsg=messageNew;
      console.log(messageNew);
      tmpMsg.type = "msg";
      temp.push(tmpMsg);
      this.setState({ message: temp });
    });

    this.state.socket.on("new-member", (memberNew) => {
      var tmpMember=memberNew;
      console.log(memberNew);
      tmpMember.type = "announce";
      temp.push(tmpMember);
      this.setState({ message: temp });
    });
  };

  displayAllMessage = () => {
    return this.state.message.map((msg, idx) => (
      <div key={idx}>
        {msg.type === "announce"? <MessageAnnounce label={msg.userName + " has joined"} />:msg.userName === this.state.name ? (
          <MessageRight
            text={msg.text}
            time={msg.createdTime.substring(11,19)}
          />
        ) : (
          <MessageLeft
            sender={msg.userName}
            text={msg.text}
            time={msg.createdTime.substring(11,19)}
          />
        )}
      </div>
    ));
  };

  render() {
    return (
      <div>
        <MessageAnnounce label={"Unread messages"} />
        {this.displayAllMessage()}
      </div>
    );
  }
  componentDidMount() {}
}
