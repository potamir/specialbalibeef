import React, { Component } from "react";
import { EditorState, ContentState } from "draft-js";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Kaca from "html-parse-stringify";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
// const htmlToDraft = dynamic(
//   () => {
//     return import("html-to-draftjs");
//   },
//   { ssr: false }
// );

class DisplayProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      htmlToDraft: "",
      _768: { matches: false },
    };
    this.getPaymentPage = this.getPaymentPage.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  async componentDidMount() {
    let _768 = window.matchMedia("(max-width: 768px)");
    _768.addListener(this.mediaQueryChanged);
    await this.setState({ _768: _768 });
    import(`html-to-draftjs`).then(
      async (module) => await this.setState({ htmlToDraft: module.default })
    );
    this.getPaymentPage();
  }

  mediaQueryChanged() {
    this.getPaymentPage();
  }

  mobileDisplay() {
    const style = styled.div`
      font-size: calc(80%);
    `;
    return style;
  }

  pcDisplay() {
    const style = styled.div``;
    return style;
  }

  changeImgStyle(html) {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const htmlObject = temp;
    const totalImgTags = htmlObject.getElementsByTagName("IMG").length;
    for (let i = 0; i < totalImgTags; i++) {
      htmlObject.getElementsByTagName("IMG")[i].style.width =
        "calc(100vw - 4.1rem)";
      htmlObject.getElementsByTagName("IMG")[i].style.height = "auto";
    }
    return htmlObject.innerHTML;
  }

  async getPaymentPage() {
    const { _768 } = this.state;
    console.log(_768);
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/admin_product_get`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        let newHtml = responseJson[2].PRODUCTS_HTML;
        if (_768.matches)
          newHtml = await this.changeImgStyle(responseJson[2].PRODUCTS_HTML);
        const blocksFromHtml = this.state.htmlToDraft(newHtml);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        await this.setState({
          html: editorState,
          aaa: newHtml,
        });
      });
  }

  render() {
    const { _768 } = this.state;
    const StyledWrapper = _768.matches
      ? this.mobileDisplay()
      : this.pcDisplay();
    return (
      <StyledWrapper>
        <div className="display-product" id="content">
          <Editor
            readOnly
            editorState={this.state.html}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName additonalDisp"
            toolbarHidden
          />
        </div>
        {/*<div dangerouslySetInnerHTML={{ __html: this.state.aaa }} />*/}
      </StyledWrapper>
    );
  }
}

export default DisplayProduct;
