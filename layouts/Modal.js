import React, { Component } from "react";
import disableScroll from "disable-scroll";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const modal = document.getElementById("modals");
    modal.style.display = "none";
    disableScroll.off();
  }

  render() {
    const { Modal, BodyText, HeaderTitle, Type } = this.props;
    if (Modal) disableScroll.on();
    else disableScroll.off();
    return (
      <>
        {Modal && Type === "modal" ? (
          <div id="modals" className="modalpop">
            <div className="modalpop-content">
              <div className="modalpop-header">
                <span
                  className="close"
                  onClick={() => {
                    this.onClose();
                  }}
                >
                  &times;
                </span>
                <h2>{HeaderTitle}</h2>
              </div>
              <div className="modalpop-body">
                <p>{BodyText}</p>
              </div>
              <div className="modalpop-footer">
                <button
                  className="modalpop-button"
                  onClick={() => {
                    this.onClose();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : Modal && Type === "popup" ? (
          <div id="modals" className="modalpop">
            <div className="modalpop-content">
              <div className="modalpop-header">
                <span
                  className="close"
                  onClick={() => {
                    this.onClose();
                  }}
                >
                  &times;
                </span>
              </div>
              <div className="modalpop-header">
                <p>{BodyText}</p>
              </div>
              <div className="modalpop-footer">
                <button
                  className="modalpop-button"
                  onClick={() => {
                    this.onClose();
                  }}
                >
                  Nay
                </button>
                <button
                  className="modalpop-button"
                  onClick={() => {
                    this.onClose();
                  }}
                >
                  Yay
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>test</div>
        )}
      </>
    );
  }
}

export default Modal;
