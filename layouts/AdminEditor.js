import React, { Component } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import Placeholders from "./Placeholders";
import * as draftToHtml from "draftjs-to-html";
import Router from "next/router";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

class AdminEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      loading: false,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.submitHtml = this.submitHtml.bind(this);
    // this.getPaymentPage = this.getPaymentPage.bind(this);
  }

  async componentDidMount() {
    // this.getPaymentPage();
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

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
        if (responseJson.status === "success") {
          Router.push("/Products");
          this.setState({ loading: false });
        } else {
          alert("fail");
          console.log(status);
        }
      });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="PaymentMain">
        <div className="OriginPaymentDesc">
          <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" className="" />
          </div>
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

export default AdminEditor;