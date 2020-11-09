import React, { Component } from "react";
import DisplayItem from "../../layouts/DisplayItem";
import ListItems from "../../layouts/ListItems";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      id: null,
    };
    this.getPaymentPage = this.getPaymentPage.bind(this);
    this.setId = this.setId.bind(this);
  }
  componentDidMount() {
    this.getPaymentPage();
  }
  async getPaymentPage() {
    await fetch(`http://45.15.24.190:1010/admin_product_get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
                getPaymentPage={this.getPaymentPage}
                html={html}
                id={id}
              />
            ) : (
              <ListItems html={html} setId={this.setId} />
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default Products;

{
  /*<DisplayItem getPaymentPage={this.getPaymentPage} html={html} />*/
}
