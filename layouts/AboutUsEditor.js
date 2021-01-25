import React, { Component } from "react";
import Loading from "./Loading";

class AboutUsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", content: "", footer: "", loading: false };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getAboutUs();
  }

  async changeHandler(e, _state) {
    const a = e.target.value;
    await this.setState({ [_state]: a });
  }

  async onSubmit() {
    const { title, content, footer, loading } = this.state;
    await this.setState({ loading: true });
    await fetch(`http://45.15.24.190:1010/update_about_us`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        footer: footer,
      }),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        alert(responseJson.status);
        this.setState({ loading: false });
      });
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
        <div className="about-us-editor-div">
          <label>TITLE</label>
          <input
            className="input"
            type="text"
            placeholder="Input About Us Title.."
            maxlength="100"
            onChange={(e) => this.changeHandler(e, "title")}
            value={title}
          />
          <label>CONTENT</label>
          <textarea
            className="textarea"
            placeholder="Input About Us Content.."
            onChange={(e) => this.changeHandler(e, "content")}
            value={content}
          ></textarea>
          <label>FOOTER</label>
          <input
            className="input"
            type="text"
            placeholder="Input About Us Footer.."
            maxlength="100"
            onChange={(e) => this.changeHandler(e, "footer")}
            value={footer}
          />
          <button className="about-us-button" onClick={this.onSubmit}>
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default AboutUsEditor;
