import React, { Component } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import Placeholders from "./Placeholders";
import * as draftToHtml from "draftjs-to-html";
import Router, { withRouter } from "next/router";

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
    const param = window.location.href.split("?")[1];
    const paramSplitted = param ? param.split("&") : null;
    if (paramSplitted) {
      const status = paramSplitted[2]
        ? paramSplitted[2].split("status=")[1]
        : false;
      if (status) {
        const id = paramSplitted[1].split("id=")[1];
        const index = paramSplitted[0].split("index=")[1];
        this.getContents(parseInt(index));
      }
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  async getContents(index) {
    await fetch(`http://45.15.24.190:1010/admin_product_get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: index,
        to: 1,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        import(`html-to-draftjs`).then(async (module) => {
          const htmlToDraft = module.default;
          const blocksFromHtml = htmlToDraft(responseJson[0].PRODUCTS_HTML);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorState = EditorState.createWithContent(contentState);
          this.onEditorStateChange(editorState);
        });
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
      <div className="admin-editor-main-div">
        <div className="admin-editor-inner-div">
          <div className="admin-editor-title-div">
            <label for="title" className="admin-editor-title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="admin-editor-input"
              maxlength="60"
            />
          </div>
          <div className="admin-editor-div">
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
        </div>
        <div className="admin-editor-button-div">
          <button onClick={this.submitHtml} className="admin-editor-button">
            Submit Changes
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminEditor);
