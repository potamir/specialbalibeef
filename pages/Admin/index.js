import React, { Component } from "react";
import ComingSoon from "../../layouts/ComingSoon";
import Router from "next/router";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priv: "",
    };
  }
  onCLickHandler(param) {
    if (param == "Edit") Router.push("/Admin/Contents");
    else if (param == "Add") Router.push("/Admin/Add_Content");
    else if (param == "AddAdmin") Router.push("/Admin/Add_Admin");
    else if (param == "ManageAdmin") Router.push("/Admin/Manage_Admin");
    else if (param == "logout") {
      this.Logout();
    }
  }

  async componentDidMount() {
    const priv = await localStorage.getItem("privilege");
    this.setState({ priv: priv });
  }

  Logout() {
    localStorage.clear();
    Router.push("/");
  }

  render() {
    const { priv } = this.state;
    return (
      <div className="admin-main-div">
        <div
          className="admin-inner-div add-content"
          onClick={() => this.onCLickHandler("Add")}
        >
          Add New Content
        </div>
        <div
          className="admin-inner-div edit-content"
          onClick={() => this.onCLickHandler("Edit")}
        >
          Manage Contents
        </div>
        {priv == 1 ? (
          <>
            <div
              className="admin-inner-div add-admin"
              onClick={() => this.onCLickHandler("AddAdmin")}
            >
              Add Admin
          </div>
            <div
              className="admin-inner-div add-admin"
              onClick={() => this.onCLickHandler("ManageAdmin")}
            >
              Manage Admin
        </div>
          </>
        ) : (
            console.log(priv)
          )}
        <div
          className="admin-inner-div logout"
          onClick={() => this.onCLickHandler("logout")}
        >
          LOG OUT
        </div>
      </div>
    );
  }
}

export default Admin;
