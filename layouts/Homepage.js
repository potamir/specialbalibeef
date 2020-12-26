import React, { Component } from "react";
import ComingSoon from "./ComingSoon";
import Loading from "./Loading";

class About_Us extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    setTimeout(
      () => this.setState({ loading: false }),
      Math.random() * (3000 - 1000) + 1000
    );
  }
  render() {
    const { loading } = this.state;
    return (
      <>
        <Loading Loading={loading} />
        <div className="homepage-main-div">
          <div className="homepage-welcome-div">
            <h1 className="homepage-welcome-font">
              Welcome to Special Bali Beef
            </h1>
          </div>
          <div className="highlight-main-div">
            <div className="highlight-inner-div">
              <div className="highlight-content">
                <div className="highlight-content-title">
                  Beef Quality and Safety Assessment
                </div>
                <div className="highlight-content-details">{loremIpsum}</div>
                <div className="highlight-content-img"></div>
                <button className="button learn-more-left">Learn More</button>
              </div>
              <div className="highlight-content">
                <div className="highlight-content-title">Consumer Testing</div>
                <div className="highlight-content-details">{loremIpsum}</div>
                <div className="highlight-content-img"></div>
                <button className="button learn-more-right">Learn More</button>
              </div>
            </div>
          </div>
          <div className="homepage-more-div">
            <h1 className="homepage-more-font">Let's Know More About Us!</h1>
            <button className="button learn-more-bottom">Learn More </button>
          </div>
        </div>
      </>
    );
  }
}

export default About_Us;

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices. In massa tempor nec feugiat nisl pretium fusce id. Egestas maecenas pharetra convallis posuere morbi leo urna molestie.";
