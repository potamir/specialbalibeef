import React, { Component } from "react";
import ListItems from "../../../layouts/ListItems";
import Select from "react-select";
import * as CONSTANT from "../../../helpers/constant";

const options = [
  { value: "RND", label: "Reserch & Development" },
  { value: "PRODUCTS", label: "Products" },
  { value: "HISTORY", label: "History" },
];

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      html: "",
      id: "",
      selectedOption: { value: "RND", label: "Reserch & Development" },
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
    const { selectedOption } = this.state;
    await fetch(`http://45.15.24.190:1010/admin_html_get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: 0,
        to: 9,
        tableName: CONSTANT.TABLE_LIST[selectedOption.value],
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        await this.setState({ html: responseJson });
      });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => this.getContents());
  };

  render() {
    const { html, id, selectedOption } = this.state;
    return (
      <>
        <div>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        {html != "" ? (
          <ListItems
            html={html}
            setId={this.setId}
            comName={"Admin/Products/Edit"}
            page={selectedOption.value}
          />
        ) : null}
      </>
    );
  }
}

export default AdminProducts;
