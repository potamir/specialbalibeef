import React, { Component } from "react";
import Router from "next/router";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repassword: "",
      privilege: "",
    };
    this.enterPressed = this.enterPressed.bind(this);
    this.AddAdmin = this.AddAdmin.bind(this);
  }

  async handleChange(status, value) {
    await this.setState({ [status]: value });
  }

  enterPressed(event) {
    if (this.state.password === this.state.repassword) {
      document.getElementById("repass").style.backgroundColor = "white";
      var code = event.keyCode || event.which;
      if (code === 13) {
        this.AddAdmin()
      }
    } else {
      document.getElementById("repass").style.backgroundColor = "red";
    }
  }

  async AddAdmin() {
    console.log(this.state.username)
    await fetch(`http://45.15.24.190:8080/add_admin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        privilege: this.state.privilege === "SUPERUSER" ? 1 : 0,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.status === "success") {
          Router.push("/Admin");
        } else {
          alert("fail");
        }
      });
  }

  render() {
    return (
      <>
        <div className="AddAdminContainer">
          <h1>ADD ADMIN</h1>
          <div className="AddAdminContent">
            <div className="AddAdminGrid">
              <label>
                <b>PRIVELEGE</b>
              </label>
            </div>
            <div className="AddAdminGrid">
              <select
                value={this.state.privilege}
                onChange={(e) => this.handleChange("privilege", e.target.value)}
              >
                <option value=""></option>
                <option value="SUPERUSER">SUPERUSER</option>
                <option value="USER">USER</option>
              </select>
            </div>
          </div>
          <div className="AddAdminContent">
            <div className="AddAdminGrid">
              <label>
                <b>USERNAME</b>
              </label>
            </div>
            <div className="AddAdminGrid">
              <input
                id="uname"
                type="text"
                value={this.state.username}
                onChange={(e) => this.handleChange("username", e.target.value)}
              ></input>
            </div>
          </div>
          <div className="AddAdminContent">
            <div className="AddAdminGrid">
              <label>
                <b>PASSWORD</b>
              </label>
            </div>
            <div className="AddAdminGrid">
              <input
                id="pass"
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleChange("password", e.target.value)}
                onKeyUp={this.enterPressed}
              ></input>
            </div>
          </div>
          <div className="AddAdminContent">
            <div className="AddAdminGrid">
              <label>
                <b>CONFIRM PASSWORD</b>
              </label>
            </div>
            <div className="AddAdminGrid">
              <input
                id="repass"
                type="password"
                value={this.state.repassword}
                onChange={(e) =>
                  this.handleChange("repassword", e.target.value)
                }
                onKeyUp={this.enterPressed}
              ></input>
            </div>
          </div>
          <button
            className="BtnLogin"
            style={{ marginBottom: "2em" }}
            onClick={this.AddAdmin}
          >
            SUBMIT
          </button>
        </div>
      </>
    );
  }
}

export default index;
