import React, { Component } from "react";
import Link from "next/link";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { html, setId, comName } = this.props;
    return (
      <div className="list-item-main-div">
        <div className="list-item-inner-div">
          {html.map((value, index) => {
            const temp = document.createElement("div");
            temp.innerHTML = value.PRODUCTS_HTML;
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
            return (
              <Link href={`/${comName}?id=${value.ID}`}>
                <div className="list-item-wrapper" onClick={() => setId(index)}>
                  <div className="list-item-title">
                    <p>Title</p>
                  </div>
                  <div className="list-item-image-div">
                    <img className="list-item-image" src={dispImg} />
                  </div>
                  <div className="list-item-content"> {finalCont} </div>
                  <h3>Read More ></h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListItems;
