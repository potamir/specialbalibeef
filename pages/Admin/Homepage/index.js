import React, { Component } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import Placeholders from "../../../layouts/Placeholders";
import * as draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

class ContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      loading: false,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.submitHtml = this.submitHtml.bind(this);
    this.getPaymentPage = this.getPaymentPage.bind(this);
  }

  async componentDidMount() {
    // this.getPaymentPage();
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  // async getPaymentPage() {
  //   await this.setState({ loading: true });
  //   await fetch(`http://${address}/py_page_get`, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (responseJson) => {
  //       const blocksFromHtml = htmlToDraft(responseJson[0].py_page_content);
  //       const { contentBlocks, entityMap } = blocksFromHtml;
  //       const contentState = ContentState.createFromBlockArray(
  //         contentBlocks,
  //         entityMap
  //       );
  //       const editorState = EditorState.createWithContent(contentState);
  //       this.onEditorStateChange(editorState);
  //       this.setState({ loading: false });
  //     });
  // }

  async uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 25153815073b152");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }
  async submitHtml() {
    await this.setState({ loading: true });
    const { editorState } = this.state;
    await fetch(`https://45.15.24.190:1010/admin_product_post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.status === "success")
          this.setState({ loading: false });
        else console.log(status);
      });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="PaymentMain">
        <div className="OriginPaymentDesc">
          <Editor
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName additionalEditor"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              image: {
                uploadCallback: this.uploadImageCallBack,
                alt: { present: true, mandatory: false },
              },
            }}
            // toolbarCustomButtons={[<Placeholders />]}
          />
        </div>
        <div className="pyPageBtnDiv">
          <button
            onClick={this.submitHtml}
            className="paymentEditBtn normalBtn"
          >
            Submit Changes
          </button>
        </div>
      </div>
    );
  }
}

export default ContentPage;
