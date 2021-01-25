import React, { Component } from "react";
import Router from "next/router";
import Loading from "../../layouts/loading";

class About_Us extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", footer: "", loading: false };
  }
  componentDidMount() {
    this.getAboutUs();
  }
  async getAboutUs() {
    const { loading } = this.state;
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/get_about_us`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        const res = responseJson[0];
        if (res) {
          this.setState({
            title: res.TITLE,
            content: res.CONTENT,
            footer: res.FOOTER,
            loading: false,
          });
        } else alert("error");
      });
  }
  render() {
    const { title, content, footer, loading } = this.state;
    return (
      <>
        <Loading Loading={loading} />
        <div className="content-page contact-main-div">
          <div className="contact-content-div">
            <div className="contact-content-title">{title}</div>
            <div className="contact-content">{content}</div>
            <div className="contact-content-footer">{footer}</div>
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
              <button className="contact-form-input button-submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default About_Us;
