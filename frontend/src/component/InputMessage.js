import React, { Component } from "react";
import "./InputMessage.css";
import { Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import socketIOClient from 'socket.io-client'
export default class InputMessage extends Component {
  render() {
    const { input, message } = this.state
    const style = { marginTop: 20, paddingLeft: 50 }
    return (
      <form
        onSubmit={(e) => {
          //alert(document.getElementById("InputMessage").value);
          this.send(e);
        }}
        className="InputMessage-wrap"
      >
        <input
          className="InputMessage-input"
          id="InputMessage"
          maxLength="30"
          required
          value = {input}
          onChange={this.changeInput}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#65B2FA" }}
          className="InputMessage-button"
          onKeyDown={e => {
            if (e.keyCode === 13) {
              alert("from keyboard");
            }
          }}
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
      </form>
    );
  }
  componentDidMount() {
    this.response();
  }

  //*

  constructor() {
    super();
    this.state = {
      input: '',
      message: [],
      endpoint: "http://localhost:10001" // เชื่อมต่อไปยัง url ของ realtime server
    }
  }

  send = (e) => {
    e.preventDefault();
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    socket.emit('sent-message', input);
    this.setState({ input: '' })
  }

  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      temp.push(messageNew)
      this.setState({ message: temp })
    })
  
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value })
  }
  //*/
}
