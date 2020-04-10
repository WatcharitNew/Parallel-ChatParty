import React, { Component } from "react";
import "./InputMessage.css";
import { Button } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
export default class InputMessage extends Component {
  render() {
    return (
      <form
        onSubmit={() => {
          alert(document.getElementById("InputMessage").value);
        }}
        className="InputMessage-wrap"
      >
        <input
          className="InputMessage-input"
          id="InputMessage"
          maxLength="30"
          required
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
      </form>
    );
  }
  componentDidMount() {}
}
