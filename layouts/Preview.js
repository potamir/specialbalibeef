import React, { Component } from "react";
import DisplayItem from "./DisplayItem";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }
  closeModal() {
    const { previewHandler } = this.props;
    const modal = document.getElementById("previewResult");
    modal.style.display = "none";
    previewHandler();
  }
  render() {
    const { html, title } = this.props;
    return (
      <div id="previewResult" className="modal preview-modal">
        <div className="modal-content preview-modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.closeModal}>
              &times;
            </span>
            <h2>PREVIEW CONTENT</h2>
          </div>
          <div className="modal-body">
            <DisplayItem html={html} title={title} />
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
