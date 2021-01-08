import React, { Component } from "react";
import ComingSoon from "./ComingSoon";
import Router from "next/router";
import Loading from "./Loading";
import * as CONSTANT from "../helpers/constant";

class About_Us extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      highlightItem_data: "",
      highlightedItem: "",
    };
  }
  async componentDidMount() {
    await this.getHighlightItem();
    const { highlightItem_data } = this.state;
    for (let i = 0; i < 2; i++) {
      await this.getHighlightedItem(
        highlightItem_data[i].ITEM_TABLE,
        highlightItem_data[i].ITEM_ID
      );
    }
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

  async getHighlightedItem(table, id) {
    console.log(table, id);
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/admin_html_get_spesific`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tableName: table,
        id: id,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson) {
          this.setState((prevState) => ({
            highlightedItem: [...prevState.highlightedItem, responseJson[0]],
            loading: false,
          }));
        } else {
          alert("fail");
          this.setState({ loading: false });
        }
      });
  }

  nextRouteHandler(comName, index, value, status) {
    const { page } = this.props;
    Router.push({
      pathname: `/${comName}`,
    });
  }

  render() {
    const { loading, highlightedItem, highlightItem_data } = this.state;
    let finalCont = [];
    for (let i = 0; i < 2; i++) {
      if (highlightedItem[i]) {
        const temp = document.createElement("div");
        temp.innerHTML = highlightedItem[i].HTML;
        const htmlObject = temp;
        const stImage = htmlObject.getElementsByTagName("IMG")[0];
        const dispImg = stImage
          ? stImage.src
          : require("../assets/noimage.png");
        finalCont.push({
          title: highlightedItem[i].TITLE,
          content:
            highlightedItem[i].HTML.replace(/<(.|\n)*?>/g, "").substring(
              0,
              200
            ) + "...",
          img: dispImg,
        });
      }
    }
    console.log(highlightedItem, highlightItem_data);
    return (
      <>
        <Loading Loading={loading} />
        <div className="homepage-main-div">
          <div className="homepage-welcome-div">
            <h1 className="homepage-welcome-font">Special Bali Beef</h1>
          </div>
          <div className="highlight-main-div">
            <div className="highlight-inner-div">
              <div className="highlight-content">
                <div className="highlight-content-title">
                  {finalCont[0] ? finalCont[0].title : ""}
                </div>
                <div className="highlight-content-details">
                  {finalCont[0] ? finalCont[0].content : ""}
                </div>
                <div className="highlight-content-img">
                  <img
                    className="highlight-img"
                    src={finalCont[0] ? finalCont[0].img : ""}
                  />
                </div>
                <button
                  className="button learn-more-left"
                  onClick={() =>
                    this.nextRouteHandler(
                      CONSTANT.PAGE_LIST[highlightItem_data[0].ITEM_TABLE],
                      highlightedItem[0].ID,
                      highlightedItem[0],
                      false
                    )
                  }
                >
                  Learn More
                </button>
              </div>
              <div className="highlight-content">
                <div className="highlight-content-title">
                  {finalCont[1] ? finalCont[1].title : ""}
                </div>
                <div className="highlight-content-details">
                  {finalCont[1] ? finalCont[1].content : ""}
                </div>
                <div className="highlight-content-img">
                  <img
                    className="highlight-img"
                    src={finalCont[1] ? finalCont[1].img : ""}
                  />
                </div>
                <button
                  className="button learn-more-right"
                  onClick={() =>
                    this.nextRouteHandler(
                      CONSTANT.PAGE_LIST[highlightItem_data[1].ITEM_TABLE],
                      highlightedItem[1].ID,
                      highlightedItem[1],
                      false
                    )
                  }
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="homepage-more-div">
            <h1 className="homepage-more-font">Let's Know More About Us!</h1>
            <button className="button learn-more-bottom">Learn More </button>
          </div>
        </div>
      </>
    );
  }
}

export default About_Us;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices. In massa tempor nec feugiat nisl pretium fusce id. Egestas maecenas pharetra convallis posuere morbi leo urna molestie.";
