import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

let mq = "";
if (process.browser) {
  mq = window.matchMedia("(max-width: 768px)");
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "/",
      blogSub: false,
      portoSub: false,
      shopSub: false,
      aboutSub: false,
    };
    this.setNav = this.setNav.bind(this);
    this.setSub = this.setSub.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillUnmount() {
    mq.removeListener(this.mediaQueryChanged);
  }
  mediaQueryChanged() {
    this.forceUpdate();
  }

  async setSub(_state, _status) {
    await this.setState({
      blogSub: false,
      portoSub: false,
      shopSub: false,
      aboutSub: false,
    });
    await this.setState({ [_state]: _status });
  }

  componentDidMount() {
    mq.addListener(this.mediaQueryChanged);
    let currentPath = Router.pathname;
    if (currentPath.split("/").length > 2)
      currentPath = `/${currentPath.split("/")[1]}`;
    this.setState({ activeNav: currentPath });
  }
  setNav(newPath) {
    this.setState({ activeNav: newPath });
  }
  closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
  navBarDesktop() {
    const { activeNav } = this.state;
    return (
      <div className="header-nav-wrapper">
        <Link href="/">
          <a
            className={`header-nav ${activeNav == "/" ? "active-nav" : ""}`}
            onClick={() => this.setNav("/")}
          >
            Home
          </a>
        </Link>
        <Link href="/About_Us">
          <a
            className={`header-nav ${
              activeNav == "/About_Us" ? "active-nav" : ""
            }`}
            onClick={() => this.setNav("/About_Us")}
          >
            About Us
          </a>
        </Link>
        <Link href="/Products">
          <a
            className={`header-nav ${
              activeNav == "/Products" ? "active-nav" : ""
            }`}
            onClick={() => this.setNav("/Products")}
          >
            Products
          </a>
        </Link>
        <Link href="/Research_And_Development">
          <a
            className={`header-nav ${
              activeNav == "/Research_And_Development" ? "active-nav" : ""
            }`}
            onClick={() => this.setNav("/Research_And_Development")}
          >
            Research & Development
          </a>
        </Link>
        <Link href="/Admin">
          <a
            className={`header-nav ${
              activeNav == "/Admin" ? "active-nav" : ""
            }`}
            onClick={() => this.setNav("/Admin")}
          >
            Admin
          </a>
        </Link>
      </div>
    );
  }

  navBarMobile() {
    const { activeNav, blogSub, portoSub, shopSub, aboutSub } = this.state;
    return (
      <React.Fragment>
        <Link href="/">
          <a
            className={`mobile-nav ${
              activeNav == "/" ? "active-mobile-nav" : ""
            }`}
            onClick={() => {
              this.setNav("/");
              this.closeModal();
            }}
          >
            HOME
          </a>
        </Link>
        <Link href="/About_Us">
          <a
            className={`mobile-nav ${
              activeNav == "/About_Us" ? "active-mobile-nav" : ""
            }`}
            onClick={() => {
              this.setNav("/About_Us");
              this.closeModal();
            }}
          >
            About Us
          </a>
        </Link>
        <Link href="/Products">
          <a
            className={`mobile-nav ${
              activeNav == "/Products" ? "active-mobile-nav" : ""
            }`}
            onClick={() => {
              this.setNav("/Products");
              this.closeModal();
            }}
          >
            Products
          </a>
        </Link>
        <Link href="/Research_And_Development">
          <a
            className={`mobile-nav ${
              activeNav == "/Research_And_Development"
                ? "active-mobile-nav"
                : ""
            }`}
            onClick={() => {
              this.setNav("/Research_And_Development");
              this.closeModal();
            }}
          >
            Research & Development
          </a>
        </Link>
        <Link href="/Admin">
          <a
            className={`mobile-nav ${
              activeNav == "/Admin"
                ? "active-mobile-nav"
                : ""
            }`}
            onClick={() => {
              this.setNav("/Admin");
              this.closeModal();
            }}
          >
            Admin
          </a>
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="header-wrapper">
        <div id="myModal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={this.closeModal}>
                &times;
              </span>
              <h2>Menu</h2>
            </div>
            <div className="modal-body">{this.navBarMobile()}</div>
            <div className="modal-footer">
              <a className="header-logo sub-header-logo">Special Bali Beef</a>
            </div>
          </div>
        </div>

        <div className="header-logo-wrapper">
          {mq.matches ? (
            <div
              className="header-menu"
              onClick={() => {
                const modal = document.getElementById("myModal");
                modal.style.display = "block";
              }}
            >
              ≡
            </div>
          ) : null}
          <Link href="/">
            <p className="header-logo" onClick={() => this.setNav("/")}>
              Special Bali Beef
            </p>
          </Link>
        </div>
        {mq.matches ? null : this.navBarDesktop()}
      </div>
    );
  }
}

export default Header;
