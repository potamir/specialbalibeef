import React, { Component } from "react";
import Router from "next/router";

export class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      privilege: "",
      ID: "",
      data: [],
      modalType: "",
      openModal: false,
      openDeleteModal: false
    };
    this.GetAdmin = this.GetAdmin.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.UpdateDeleteData = this.UpdateDeleteData.bind(this);
    this.HandleDelete = this.HandleDelete.bind(this);
  }

  componentDidMount() {
    this.GetAdmin()
  }

  async handleChange(status, value, id) {
    if (status === "privilege") {
      await this.setState({ [status]: value, openModal: true, modalType: "privilege", UpdateState: "privilege", ID: id });
    } else
      await this.setState({ [status]: value, UpdateState: status });
  }

  async enterPressed(type, event, id) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      await this.setState({ openModal: true, modalType: type, ID: id })
      console.log(this.state.ID)
    }
  }

  async GetAdmin() {
    await fetch(`http://45.15.24.190:8080/get_admin`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        console.log(responseJson.results)
        if (responseJson !== "error") {
          await this.handleChange("data", responseJson.results)
          console.log(this.state.data)
        }
        else alert("error from server")
      });
  }

  async UpdateDeleteData() {
    var route = this.state.UpdateState === "username" ? "update_username" : this.state.UpdateState === "password" ? "update_password" : this.state.UpdateState === "privilege" ? "update_privilege" : "delete_data"
    await fetch(`http://45.15.24.190:8080/${route}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.ID,
        username: this.state.username,
        password: this.state.password,
        privilege: this.state.privilege
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.status === "success") {
          window.location.reload();
        } else {
          alert(responseJson);
        }
      });
  }

  async HandleButtonClick(type) {
    if (type === "yes") {
      await this.setState({ openModal: false, openDeleteModal: false })
      this.UpdateDeleteData()
    } else {
      await this.setState({ openModal: false, openDeleteModal: false })
      window.location.reload()
    }
  }

  async HandleDelete(id) {
    await this.setState({ UpdateState: "delete", openDeleteModal: true, ID: id })
  }

  render() {
    return (
      <>
        {this.state.openModal ?
          <>
            <alert>save changes?</alert>
            <button onClick={(e) => this.HandleButtonClick("yes")}>YES</button>
            <button onClick={(e) => this.HandleButtonClick("no")}>NO</button>
          </> : null}
        {this.state.openDeleteModal ?
          <>
            <alert>Are you sure want to delete admin with ID {this.state.ID} ?</alert>
            <button onClick={(e) => this.HandleButtonClick("yes")}>YES</button>
            <button onClick={(e) => this.HandleButtonClick("no")}>NO</button>
          </> : null}
        <div className="ManageAdminTableContainer">
          <table>
            <tr>
              <th style={{ width: "3%" }}>No</th>
              <th style={{ width: "30%" }}>Username</th>
              <th style={{ width: "30%" }}>Password</th>
              <th style={{ width: "20%" }}>Privilege</th>
              <th style={{ width: "10%" }}>Delete</th>
            </tr>
            {this.state.data.map((value, index) => {
              return (
                <tr>
                  <td>{value.ID}</td>
                  <td>
                    <input
                      className="ManageAdminInput"
                      onChange={(e) => this.handleChange("username", e.target.value)}
                      defaultValue={value.USERNAME}
                      onKeyUp={(e) => this.enterPressed("username", e, value.ID)}>
                    </input>
                  </td>
                  <td>
                    <input
                      className="ManageAdminInput"
                      onChange={(e) => this.handleChange("password", e.target.value)}
                      defaultValue={value.PASSWORD}
                      onKeyUp={(e) => this.enterPressed("password", e, value.ID)}>
                    </input>
                  </td>
                  <td>
                    <select
                      value={value.privilege}
                      onChange={(e) => this.handleChange("privilege", e.target.value, value.ID)}
                    >
                      <option value="SUPERUSER">SUPERUSER</option>
                      <option value="USER">USER</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={(e) => this.HandleDelete(value.ID)}>X</button>
                  </td>
                </tr>
              )
            })}

          </table>
        </div>
      </>
    );
  }
}

export default index;
