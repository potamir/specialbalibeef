import React, { Component } from "react";
import ComingSoon from "../../layouts/ComingSoon";
import Router from "next/router";

class Admin extends Component {
  onCLickHandler(param) {
    if (param == "Edit") Router.push("/Admin/Contents");
    else if (param == "Add") Router.push("/Admin/Add_Content");
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
      </div>
    );
  }
}

export default Admin;
