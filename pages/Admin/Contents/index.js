import React, { Component } from "react";
import ListItems from "../../../layouts/ListItems";
import Select from "react-select";
import * as CONSTANT from "../../../helpers/constant";
import Loading from "../../../layouts/Loading";
import Router from "next/router";

const options = [
  { value: "RND", label: "Reserch & Development" },
  { value: "PRODUCTS", label: "Products" },
  { value: "HISTORY", label: "History" },
  { value: "TNS", label: "Training & Mentoring" },
  { value: "IS", label: "Information System" },
  { value: "ABOUT_US", label: "About Us" },
];

class AdminContents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      html: "",
      id: "",
      loading: false,
      selectedOption: { value: "RND", label: "Reserch & Development" },
      highlightItem_data: "",
    };
    this.getContents = this.getContents.bind(this);
    this.deleteContent = this.deleteContent.bind(this);
    this.highlightItem = this.highlightItem.bind(this);
    this.setId = this.setId.bind(this);
  }

  async componentDidMount() {
    await this.getContents();
    await this.getHighlightItem();
  }
  async setId(param) {
    await this.setState({ id: param });
  }
  async getContents() {
    const { selectedOption } = this.state;
    await this.setState({ loading: true });
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
        await this.setState({ html: responseJson, loading: false });
      });
  }

  async deleteContent(id) {
    const { selectedOption } = this.state;
    console.log("abc", selectedOption, id);
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/admin_html_delete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: CONSTANT.TABLE_LIST[selectedOption.value],
        id: id,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.status === "success") {
          this.getContents();
        } else {
          alert("fail");
          this.setState({ loading: false });
          console.log(status);
        }
      });
  }
  async highlightItem(id) {
    const { selectedOption } = this.state;
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/admin_highlight`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: CONSTANT.TABLE_LIST[selectedOption.value],
        id: id,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.status === "success") {
          this.setState({ loading: false });
        } else {
          alert("fail");
          this.setState({ loading: false });
        }
      });
  }

  async getHighlightItem() {
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/admin_highlight_get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson) {
          this.setState({ loading: false, highlightItem_data: responseJson });
        } else {
          alert("fail");
          this.setState({ loading: false });
        }
      });
  }

  handleChange = (selectedOption) => {
    if (selectedOption.value == "ABOUT_US") {
      Router.push("http://localhost:3000/Admin/Contents/About_Us");
    } else this.setState({ selectedOption }, () => this.getContents());
  };

  render() {
    const {
      html,
      id,
      selectedOption,
      loading,
      highlightItem_data,
    } = this.state;
    return (
      <>
        <Loading Loading={loading} />
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
            comName={"Admin/Contents/Edit"}
            page={selectedOption.value}
            deleteContent={this.deleteContent}
            highlightItem={this.highlightItem}
            highlightItem_data={highlightItem_data}
          />
        ) : null}
      </>
    );
  }
}

export default AdminContents;
