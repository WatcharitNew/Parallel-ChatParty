import React, { Component } from "react";
import "./InputMessage.css";
import { Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import socketIOClient from 'socket.io-client';
export default class InputMessage extends Component {
  
  constructor() {
    super();
    this.state = {
      input: '',
      message: [],
      endpoint: "http://localhost:10001" // เชื่อมต่อไปยัง url ของ realtime server
    }
  }

  send = () => {
    const { endpoint, input } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit('sent-message', input);
    this.setState({ input: '' });
    console.log("message sent!");
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }
  
  render() {
    const { input, message } = this.state;
    const style = { marginTop: 20, paddingLeft: 50 };
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
          type="submit"
          style={{ backgroundColor: "#65B2FA" }}
          className="InputMessage-button"
          onClick={()=>this.send()}
        >
          Send 
          <SendIcon />
        </Button>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {i + 1} : {data}
            </div>
          )
        }
      </div>
    );
  }
}
