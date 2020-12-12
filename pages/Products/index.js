import React, { Component } from "react";
import DisplayItem from "../../layouts/DisplayItem";
import ListItems from "../../layouts/ListItems";
import Pagination from "../../layouts/Pagination";
import { withRouter } from "next/router";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      id: null,
      active: 1,
    };
    this.getContents = this.getContents.bind(this);
    this.setId = this.setId.bind(this);
    this.paginationSelect = this.paginationSelect.bind(this);
  }
  componentDidMount() {
    this.getContents(0, 9);
  }
  componentDidUpdate() {
    const { id } = this.state;
    const { router } = this.props;
    console.log("ROUTER", router);
    const currUrlID = router.query.index;
    if (!id && currUrlID) {
      this.setState({ id: currUrlID });
    } else if (id && !currUrlID) {
      this.setState({ id: null });
    }
    console.log("======>>>", window.location.href.split("id=")[1]);
  }
  async getContents(from, to) {
    await fetch(`http://45.15.24.190:1010/admin_html_get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from,
        to: to,
        tableName: "ADMIN_PRODUCTS",
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        await this.setState({ html: responseJson });
      });
  }
  async setId(param) {
    await this.setState({ id: param });
  }
  async paginationSelect(active) {
    console.log("active", active);
    const to = active * 9;
    const from = to - 9;
    this.setState({ active: active });
    this.getContents(from, to);
  }
  render() {
    const { html, id, active } = this.state;
    console.log(this.state);
    return (
      <>
        {html != "" ? (
          <>
            {id != null ? (
              <DisplayItem
                getContents={this.getContents}
                html={html}
                id={id}
                page={"PRODUCTS"}
              />
            ) : (
              <>
                <ListItems
                  html={html}
                  setId={this.setId}
                  comName={"Products"}
                  page={"PRODUCTS"}
                />
                <Pagination
                  totalRows={html[0].TOTAL_ROWS}
                  paginationSelect={this.paginationSelect}
                  active={active}
                />
              </>
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default withRouter(Products);

{
  /*<DisplayItem getContents={this.getContents} html={html} />*/
}
