import React, { Component } from "react";
import ComingSoon from "../../layouts/ComingSoon";
import Router from "next/router";

class Admin extends Component {
  onCLickHandler(param) {
    if (param == "Edit") Router.push("/Admin/Products");
    else if (param == "Add") Router.push("/Admin/Add_Product");
  }
  render() {
    return (
      <div className="admin-main-div">
        <div
          className="admin-inner-div"
          onClick={() => this.onCLickHandler("Add")}
        >
          Add New Product
        </div>
        <div
          className="admin-inner-div"
          onClick={() => this.onCLickHandler("Edit")}
        >
          Manage Products
        </div>
      </div>
    );
  }
}

export default Admin;
