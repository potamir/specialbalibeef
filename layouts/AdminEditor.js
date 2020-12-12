import React, { Component } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import Placeholders from "./Placeholders";
import * as draftToHtml from "draftjs-to-html";
import Router, { withRouter } from "next/router";
import * as CONSTANT from "../helpers/constant";
import createVideoPlugin from "draft-js-video-plugin";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const videoPlugin = createVideoPlugin();
class AdminEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      loading: false,
      status: false,
      title: "",
      id: "",
      page: "",
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.submitHtml = this.submitHtml.bind(this);
    this.editHtml = this.editHtml.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
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
        const page = paramSplitted[3].split("page=")[1];
        console.log(id);
        this.getContents(parseInt(index), page);
        this.setState({ status: status, id: id, page: page });
      }
    }
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  async getContents(index, page) {
    console.log(page);
    await fetch(`http://45.15.24.190:1010/admin_html_get`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: index,
        to: 1,
        tableName: CONSTANT.TABLE_LIST[page],
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        import(`html-to-draftjs`).then(async (module) => {
          const htmlToDraft = module.default;
          const blocksFromHtml = htmlToDraft(responseJson[0].HTML);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          const editorState = EditorState.createWithContent(contentState);
          this.onEditorStateChange(editorState);
        });
        this.setState({ title: responseJson[0].TITLE });
      });
  }

  async uploadImageCallBack(file) {
    console.log(file);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dvc7wsoyw/image/upload"
      );
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "specialbalibeef");
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response.url);
        resolve({
          data: {
            link: response.url,
          },
        });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  }

  // uploadImageCallBack = (file) =>
  //   new Promise((resolve, reject) => {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     let img = new Image();
  //     // let url = ''
  //     reader.onload = function (e) {
  //       img.src = this.result;
  //       console.log(img.src);
  //       resolve({
  //         data: {
  //           link: img.src,
  //         },
  //       });
  //     };
  //   });

  // uploadImageCallBack = async (files) => {
  //   console.log(files);
  //   const data = new FormData();
  //   data.append("file", files);
  //   data.append("upload_preset", "specialbalibeef");
  //   const res = await fetch(
  //     "upload: https://api.cloudinary.com/v1_1/dvc7wsoyw/image/upload",
  //     { method: aPOSTa, body: data }
  //   );
  //   const file = await res.json();
  //   console.log(file);
  // };

  async submitHtml() {
    await this.setState({ loading: true });
    const { page } = this.props;
    const { editorState, title } = this.state;
    await fetch(`http://45.15.24.190:1010/admin_html_post`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        tableName: CONSTANT.TABLE_LIST[page],
        title: title,
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
  async editHtml() {
    await this.setState({ loading: true });
    const { editorState, title, id, page } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    await fetch(`http://45.15.24.190:1010/admin_html_edit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        tableName: CONSTANT.TABLE_LIST[page],
        id: id,
        title: title,
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

  titleHandler(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { editorState, title, status } = this.state;
    console.log(videoPlugin.addVideo);
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
              value={title}
              onChange={(e) => this.titleHandler(e)}
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
                  urlEnabled: false,
                  uploadEnabled: true,
                  alignmentEnabled: true, // Whether to display the arrange button is equivalent to text-align
                  uploadCallback: this.uploadImageCallBack,
                  previewImage: true,
                  inputAccept: "image/*",
                  alt: { present: false, mandatory: false },
                },
              }}
              // toolbarCustomButtons={[<Placeholders />]}
            />
          </div>
        </div>
        <div className="admin-editor-button-div">
          <button
            onClick={() => (status ? this.editHtml() : this.submitHtml())}
            className="admin-editor-button"
          >
            Submit Changes
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AdminEditor);
