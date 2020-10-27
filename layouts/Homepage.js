import React, { Component } from "react";
import ComingSoon from "./ComingSoon";

class About_Us extends Component {
  render() {
    return (
      <div className="homepage-main-div">
        <div className="homepage-welcome-div">
          <h1 className="homepage-welcome-font">
            Welcome to Special Bali Beef
          </h1>
        </div>
        <div className="highlight-main-div">
          <div>
            <h1>Our Newest Product</h1>
          </div>
          <div className="highlight-inner-div">
            <div className="highlight-content">
              <div className="highlight-content-title">Title</div>
              <div className="highlight-content-details">{loremIpsum}</div>
              <div className="highlight-content-img"></div>
              <button className="button learn-more-left">Learn More</button>
            </div>
            <div className="highlight-content">
              <div className="highlight-content-title">Title</div>
              <div className="highlight-content-details">{loremIpsum}</div>
              <div className="highlight-content-img"></div>
              <button className="button learn-more-right">Learn More</button>
            </div>
          </div>
        </div>
        <div className="homepage-more-div">
          <h1 className="homepage-more-font">Let's Know More About Us!</h1>
          <button className="button learn-more-bottom">Learn More ></button>
        </div>
      </div>
    );
  }
}

export default About_Us;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices. In massa tempor nec feugiat nisl pretium fusce id. Egestas maecenas pharetra convallis posuere morbi leo urna molestie.";
