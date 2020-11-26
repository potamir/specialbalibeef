import React, { Component } from "react";
import DisplayItem from "../../layouts/DisplayItem";
import ListItems from "../../layouts/ListItems";
import { withRouter } from "next/router";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      id: null,
    };
    this.getContents = this.getContents.bind(this);
    this.setId = this.setId.bind(this);
  }
  componentDidMount() {
    this.getContents();
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
  async getContents() {
    await fetch(`http://45.15.24.190:1010/admin_html_get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: 0,
        to: 9,
        tableName: "ADMIN_HISTORY",
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
  render() {
    const { html, id } = this.state;
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
                page={"HISTORY"}
              />
            ) : (
              <ListItems
                html={html}
                setId={this.setId}
                comName={"HISTORY"}
                page={"HISTORY"}
              />
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default withRouter(History);

{
  /*<DisplayItem getContents={this.getContents} html={html} />*/
}
