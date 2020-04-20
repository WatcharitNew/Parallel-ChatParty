import React, { Component } from "react";
import "./Message.css";
import MessageAnnounce from "./MessageAnnounce";
import MessageLeft from "./MessageLeft";
import MessageRight from "./MessageRight";
import LocalStorageService from "../LocalStorageService";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
      name: LocalStorageService.getUserName(),
      socket: props.socket
    };
  }

  componentWillMount() {
    this.state.socket.emit("login", {
      userName: this.state.name
    });
	}

  componentDidMount = () => {
    this.response();

    //for create chatRoom
    /*const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('create-group', {
      chatName: "Test1",
      client: LocalStorageService.getUserID()
    });

    socket.on("new-group", (groupNew) => {
      console.log(groupNew);
    });*/
  };

  response = () => {
    const { endpoint, message } = this.state;
    const temp = message;

    this.state.socket.on("new-message", (messageNew) => {
      console.log(messageNew);
      temp.push(messageNew);
      this.setState({ message: temp });
    });
  };

  displayAllMessage = () => {
    return this.state.message.map((msg, idx) => (
      <div key={idx}>
        {msg.userName === this.state.name ? (
          <MessageRight
            sender={msg.userName}
            text={msg.text}
            time={msg.createdTime}
          />
        ) : (
          <MessageLeft
            sender={msg.userName}
            text={msg.text}
            time={msg.createdTime}
          />
        )}
      </div>
    ));
  };

  render() {
    return (
      <div>
        <MessageAnnounce label={"Unread messages"} />
        <MessageLeft sender={"Shiba"} text={"Lorem ipsum"} time={"1.11 PM"} />
        <MessageRight text={"Hello"} time={"2.11 PM"} />
        {this.displayAllMessage()}
      </div>
    );
  }
  componentDidMount() {}
}
