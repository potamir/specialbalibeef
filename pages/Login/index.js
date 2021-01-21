import React, { Component } from "react";
import ComingSoon from "../../layouts/ComingSoon";
import Router from "next/router";
import lock from "../../assets/lock.svg";
import people from "../../assets/user.png";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      openModal: false,
    };
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
  }

  enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.login();
    }
  };

  async login() {
    await fetch(`http://45.15.24.190:8080/admin_login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.isLogin) {
          await localStorage.setItem("isLogin", responseJson.isLogin);
          await localStorage.setItem("username", responseJson.username);
          await localStorage.setItem("privilege", responseJson.privilege);
          await localStorage.setItem("id", responseJson.id);
          Router.push("/Admin");
        } else {
          await this.setState({ openModal: true });
        }
      });
  }

  async handleChange(status, value) {
    await this.setState({ [status]: value });
  }

  render() {
    return (
      <>
        {/* modal */}
        {this.state.openModal ? (
          <div className="modalContainer">
            <div className="modalContent">
              <div className="modalHeader">
                <span
                  className="close"
                  onClick={async (e) =>
                    await this.setState({ openModal: false })
                  }
                >
                  &times;
                </span>
                <h2>Warning</h2>
              </div>
              <div className="modalBody">
                <p>Wrong login username or password</p>
              </div>
              <div className="modalFooter">
                <button
                  className="modalOKButton"
                  onClick={async (e) =>
                    await this.setState({ openModal: false })
                  }
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="LoginContainer">
          <h1>LOGIN</h1>
          <div className="LoginContent">
            {/* <img
              style={{ width: "40px", marginRight: "5px" }}
              src={people}
            ></img> */}
            <label style={{ marginRight: "1em" }}>
              <b>USERNAME</b>
            </label>
            <input
              className="LoginInput"
              id="uname"
              type="text"
              value={this.state.username}
              onChange={(e) => this.handleChange("username", e.target.value)}
            ></input>
          </div>
          <div className="LoginContent">
            <label style={{ marginRight: "1em" }}>
              <b>PASSWORD</b>
            </label>
            {/* <img style={{ width: "40px", marginRight: "5px" }} src={lock}></img> */}
            <input
              className="LoginInput"
              id="pass"
              type="password"
              value={this.state.password}
              onChange={(e) => this.handleChange("password", e.target.value)}
              onKeyUp={this.enterPressed}
            ></input>
          </div>
          <button
            className="BtnLogin"
            style={{ marginBottom: "2em" }}
            onClick={this.login}
          >
            LOGIN
          </button>
        </div>
      </>
    );
  }
}

export default Admin;
