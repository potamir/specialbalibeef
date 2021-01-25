import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import * as CONSTANT from "../helpers/constant";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  nextRouteHandler(comName, index, value, status) {
    const { page } = this.props;
    Router.push({
      pathname: `/${comName}`,
      query: {
        index: `${index}`,
        id: value.ID,
        status: status,
        page: page,
      },
    });
  }
  render() {
    const {
      html,
      setId,
      comName,
      admin,
      deleteContent,
      highlightItem,
      highlightItem_data,
      page,
    } = this.props;
    return (
      <div className="list-item-main-div">
        <div className="list-item-inner-div">
          {html.map((value, index) => {
            const temp = document.createElement("div");
            temp.innerHTML = value.HTML;
            const htmlObject = temp;
            const stImage = htmlObject.getElementsByTagName("IMG")[0];
            const dispImg = stImage
              ? stImage.src
              : require("../assets/noimage.png");
            const contLength = htmlObject.getElementsByTagName("P").length;
            let newDisContent = "";
            for (let i = 0; i < contLength; i++) {
              const stContent = htmlObject.getElementsByTagName("P")[i];
              newDisContent += stContent.innerHTML.replace(/<(.|\n)*?>/g, "");
            }
            let finalCont = "";
            if (newDisContent != "")
              finalCont = newDisContent.substring(0, 100) + "...";
            else finalCont = "no Desc";
            let highlighted = false;
            if (highlightItem_data) {
              if (
                highlightItem_data[0].ITEM_TABLE == CONSTANT.TABLE_LIST[page] &&
                highlightItem_data[0].ITEM_ID == value.ID
              )
                highlighted = true;
              else if (
                highlightItem_data[1].ITEM_TABLE == CONSTANT.TABLE_LIST[page] &&
                highlightItem_data[1].ITEM_ID == value.ID
              )
                highlighted = true;
            }
            return (
              <div className="list-item-wrapper" onClick={() => setId(index)}>
                <div className="list-item-title">
                  <p>{value.TITLE}</p>
                </div>
                <div className="list-item-image-div">
                  <img className="list-item-image" src={dispImg} />
                </div>
                <div className="list-item-content"> {finalCont} </div>
                {comName == "Admin/Contents/Edit" ? (
                  <div className="list-item-choose">
                    {highlighted ? (
                      <div className="list-item-highlighted">Highlighted</div>
                    ) : (
                      <div
                        className="list-item-choose-button list-item-highlight-button"
                        onClick={() => highlightItem(value.ID)}
                      >
                        Highlight
                      </div>
                    )}
                    <div
                      className="list-item-choose-button list-item-edit-button"
                      onClick={() =>
                        this.nextRouteHandler(comName, index, value, true)
                      }
                    >
                      Edit
                    </div>
                    <div
                      className="list-item-choose-button list-item-delete-button"
                      onClick={() => deleteContent(value.ID)}
                    >
                      Delete
                    </div>
                  </div>
                ) : (
                  <div
                    className="read-more"
                    onClick={() =>
                      this.nextRouteHandler(comName, index, value, false)
                    }
                  >
                    Read More >>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListItems;
