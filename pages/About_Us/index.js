import React, { Component } from "react";
import Router from "next/router";

class About_Us extends Component {
  render() {
    return (
      <div className="content-page contact-main-div">
        <div className="contact-content-div">
          <div className="contact-content-title">
            TITLE
          </div>
          <div className="contact-content">{content}</div>
          <div className="contact-content-footer">
            FOOTER
          </div>
        </div>
        <div className="contact-form-div">
          <div className="contact-form-wrapper">
            <label for="name" className="contact-form-label">
              Name
            </label>
            <input type="text" className="contact-form-input" />
          </div>
          <div className="contact-form-wrapper">
            <label for="email" className="contact-form-label">
              Email
            </label>
            <input type="text" className="contact-form-input" />
          </div>
          <div className="contact-form-wrapper">
            <label for="subject" className="contact-form-label">
              Subject
            </label>
            <input
              type="text"
              className="contact-form-input contact-form-input-subject"
            />
          </div>
          <div className="contact-form-wrapper">
            <label for="message" className="contact-form-label">
              Message
            </label>
            <textarea
              type="text"
              className="contact-form-input contact-form-input-msg"
            />
          </div>
          <div className="contact-form-wrapper">
            <button className="contact-form-input button-submit">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default About_Us;

const content =
  "CONTENT";
