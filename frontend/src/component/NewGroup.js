import React, { Component } from "react";
import "./NewGroup.css";
import { Button } from "@material-ui/core";
export default class NewGroupCard extends Component {
  render() {
    return (
      <form
        className="NewGroup-card"
        onSubmit={() => {
          alert(document.getElementById("NewGroup").value + " is created");
        }}
        className="NewGroup-wrap"
        autoComplete="off"
      >
        <input
          className="NewGroup-input"
          id="NewGroup"
          placeholder="New Group"
          maxLength="30"
          required
        />
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#8395F3", color: "white" }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              alert("from keyboard");
            }
          }}
          className="NewGroup-button"
        >
          Create
        </Button>
      </form>
    );
  }
}
