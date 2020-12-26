import React, { Component } from "react";
import Router from "next/router";

class About_Us extends Component {
  render() {
    return (
      <div className="content-page contact-main-div">
        <div className="contact-content-div">
          <div className="contact-content-title">
            Hello! Ada yang bisa saya bantu?
          </div>
          <div className="contact-content">{content}</div>
          <div className="contact-content-footer">
            Terima Kasih sudah berkunjung.
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
  "Isi formulir ini dengan lengkap dan benar untuk menghubungi saya. Anda juga bisa berkunjung langsung ke kantor saya yang beralamat di Jl. Kalumpang, RT002/RW004, Kel. Vi Suku, Kota Solok, Sumatera Barat. Setelah anda mensubmit formulir, saya akan segera menghubungi anda kekontak yang sudah anda berikan.";
