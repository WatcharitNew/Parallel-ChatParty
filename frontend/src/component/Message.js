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
          ? 0
          : SessionStorageService.getChatRoomID(),
      ref: React.createRef(),
    };
  }

  componentDidMount = () => {
    console.log(this.state.name);
    this.state.socket.on("please-login", () => {
      this.state.socket.emit("login", {
        userName: this.state.name,
      });
    });
    this.response();
    this.loadMessage();
  };

  loadMessage = () => {
    axios
      .get(utilities["backend-url"] + ":10000" + "/message/" + this.state.chatRoom)
      .then((resAll) => {
        console.log(resAll.data);
        var allMessage = resAll.data;
        axios
          .get(
            utilities["backend-url"] +
              ":10000" +
              "/message/" +
              this.state.chatRoom +
              "/" +
              SessionStorageService.getUserID()
          )
          .then((resUnread) => {
            console.log(resUnread.data);
            var unreadMessage = resUnread.data;
            var message = allMessage.slice(
              0,
              allMessage.length - unreadMessage.length
            );
            if(unreadMessage.length !== 0){
              message.push({ type: 1, text: "Unread messages" });
              message = message.concat(unreadMessage);
            }
            this.setState({ message: message }, () => {
              this.scrollToBottom();
            });
          });
        axios
          .patch(
            utilities["backend-url"] +
              ":10000" +
              "/chatroom/read/" +
              this.state.chatRoom +
              "/" +
              SessionStorageService.getUserID(),
            {}
          )
          .then((response) => {
            switch (response.status) {
              case 200:
                console.log("already read!");
                break;

              // Other case
              default:
                console.log("Status code is " + response.status);
            }
          });
      });
  };

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
        axios
          .patch(
            utilities["backend-url"] +
              ":10000" +
              "/chatroom/read/" +
              this.state.chatRoom +
              "/" +
              SessionStorageService.getUserID(),
            {}
          )
          .then((response) => {
            switch (response.status) {
              case 200:
                console.log("already read!");
                break;

              // Other case
              default:
                console.log("Status code is " + response.status);
            }
          });
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
        axios
          .patch(
            utilities["backend-url"] +
              ":10000" +
              "/chatroom/read/" +
              this.state.chatRoom +
              "/" +
              SessionStorageService.getUserID(),
            {}
          )
          .then((response) => {
            switch (response.status) {
              case 200:
                console.log("already read!");
                break;

              // Other case
              default:
                console.log("Status code is " + response.status);
            }
          });
        this.setState({ message: temp }, () => {
          this.scrollToBottom();
        });
      }
    });

    this.state.socket.on("left-member", (memberLeft) => {
      console.log(memberLeft);
      if (memberLeft.userName === this.state.name) {
        this.setState({ message: [] });
      } else if (memberLeft.chatRoom === this.state.chatRoom) {
        const { message } = this.state;
        const temp = message;
        var tmpMember = memberLeft;
        tmpMember.type = 1;
        tmpMember.text = memberLeft.userName + " has left";
        temp.push(tmpMember);
        axios
          .patch(
            utilities["backend-url"] +
              ":10000" +
              "/chatroom/read/" +
              this.state.chatRoom +
              "/" +
              SessionStorageService.getUserID(),
            {}
          )
          .then((response) => {
            switch (response.status) {
              case 200:
                console.log("already read!");
                break;

              // Other case
              default:
                console.log("Status code is " + response.status);
            }
          });
        this.setState({ message: temp }, () => {
          this.scrollToBottom();
        });
      }
    });

    this.state.socket.on("change-room-back", (changeRoom) => {
      console.log(changeRoom);
      if (changeRoom.client === SessionStorageService.getUserID()) {
        this.setState({ chatRoom: changeRoom.chatRoom, message: [] }, () => {
          if (changeRoom.chatRoom !== 0) {
            this.loadMessage();
          }
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
        {this.displayAllMessage()}
        <div ref={this.state.ref} />
      </div>
    );
  }
}
