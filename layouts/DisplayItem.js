import React, { Component } from "react";
import { EditorState, ContentState } from "draft-js";
import styled from "styled-components";
import dynamic from "next/dynamic";
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

class DisplayItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: "",
      htmlToDraft: "",
      _768: { matches: false },
      title: "",
    };
    this.getPaymentPage = this.getPaymentPage.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  async componentDidMount() {
    let _768 = window.matchMedia("(max-width: 768px)");
    _768.addListener(this.mediaQueryChanged);
    await this.setState({ _768: _768 });
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
    console.log(html, "<<===============================");
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
    const { html, id, title } = this.props;
    console.log("9999999999999999999999999aaaaa", id);
    let newHtml = html[id] ? html[id].HTML : html;
    if (_768.matches)
      newHtml = await this.changeImgStyle(id || id == 0 ? html[id].HTML : html);
    import(`html-to-draftjs`).then(async (module) => {
      const htmlToDraft = module.default;
      const blocksFromHtml = htmlToDraft(newHtml);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      await this.setState({
        html: editorState,
        title: id ? html[id].TITLE : title,
      });
    });
  }

  render() {
    const { _768, html, title } = this.state;
    const { id } = this.props;
    const StyledWrapper = _768.matches
      ? this.mobileDisplay()
      : this.pcDisplay();
    return (
      <StyledWrapper>
        <div
          className={`display-product ${id ? null : "display-product-preview"}`}
          id="content"
        >
          <div className="article-desc">TITLE: {title}</div>
          {/*<div className="article-desc">AUTHOR: aaa</div>*/}
          <Editor
            readOnly
            editorState={html}
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

export default DisplayItem;
