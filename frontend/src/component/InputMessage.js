import React, { Component } from "react";
import "./InputMessage.css";
import { Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import SessionStorageService from '../SessionStorageService';
export default class InputMessage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      message: [],
      id: SessionStorageService.getUserID(),
      chatRoom: SessionStorageService.getChatRoomID()===""?1:SessionStorageService.getChatRoomID(),
      socket: props.socket,
    }
  }

  send = () => {
    const { input, id, chatRoom } = this.state;
    this.state.socket.emit('sent-message', {
      text: input,
      client: id,
      chatRoom: chatRoom
    });
    this.setState({ input: '' });
    console.log("message sent!");
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }
  
  render() {
    return (
      <div
        className="InputMessage-wrap"
      >
        <input
          className="InputMessage-input"
          id="InputMessage"
          maxLength="30"
          required
          value = {this.state.input}
          onChange={(e)=>this.changeInput(e)}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              this.send();
            }
          }}
        />
        <Button
          variant="contained"
          style={{ backgroundColor: "#65B2FA" }}
          className="InputMessage-button"
          onClick={()=>{
            this.send();
            /*this.state.socket.emit('change-room-front', {
              client: this.state.id,
              chatRoom: SessionStorageService.getChatRoomID()===2?1:2
            });
            console.log("change room!");
            }*/
          }
        >
          Send 
          <SendIcon />
        </Button>
      </div>
    );
  }
}
