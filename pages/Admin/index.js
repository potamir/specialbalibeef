import React, { Component } from "react";
import ComingSoon from "../../layouts/ComingSoon";
import Router from "next/router";

class Admin extends Component {
  onCLickHandler(param) {
    if (param == "Edit") Router.push("/Admin/Contents");
    else if (param == "Add") Router.push("/Admin/Add_Content");
    else if (param == "AddAdmin") Router.push("/Admin/Add_Admin");
    else if (param == "logout") {
      this.Logout();
    }
  }

  Logout() {
    localStorage.clear();
    Router.push("/");
  }

  render() {
    return (
      <div className="admin-main-div">
        <div
          className="admin-inner-div"
          onClick={() => this.onCLickHandler("Add")}
        >
          Add New Content
        </div>
        <div
          className="admin-inner-div"
          onClick={() => this.onCLickHandler("Edit")}
        >
          Manage Contents
        </div>
        {localStorage.getItem("privilege") === 1 ? (
          <div
            className="admin-inner-div"
            onClick={() => this.onCLickHandler("AddAdmin")}
          >
            Add Admin
          </div>
        ) : null}
        <div
          className="admin-inner-div"
          onClick={() => this.onCLickHandler("logout")}
        >
          LOG OUT
        </div>
      </div>
    );
  }
}

export default Admin;
