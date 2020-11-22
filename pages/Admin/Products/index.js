import React, { Component } from "react";
import ListItems from "../../../layouts/ListItems";

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      html: "",
      id: "",
    };
    this.getContents = this.getContents.bind(this);
    this.setId = this.setId.bind(this);
  }

  async componentDidMount() {
    await this.getContents();
  }
  async setId(param) {
    await this.setState({ id: param });
  }
  async getContents() {
    await fetch(`http://45.15.24.190:1010/admin_product_get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: 0,
        to: 9,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        await this.setState({ html: responseJson });
      });
  }

  render() {
    const { html, id } = this.state;
    return (
      <>
        {html != "" ? (
          <ListItems
            html={html}
            setId={this.setId}
            comName={"Admin/Products/Edit"}
          />
        ) : null}
      </>
    );
  }
}

export default AdminProducts;
