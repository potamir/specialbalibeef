// import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Header from "../layouts/Header";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.css";
import "./index_992.css";
import "./index_768.css";
import "../helpers/dropdown.css";
import "../helpers/modal.css";
import "../helpers/draft.css";
import "../helpers/placeholders.css";
import "../helpers/button.css";
import "../helpers/listitems.css";
import "../helpers/admineditor.css";
import "../helpers/pagination.css";
import "../helpers/loading.css";
import { HotKeys } from "react-hotkeys";
import Router from "next/router";
import Link from "next/link";

const keyMap = {
  Login: "alt+q",
};

let flag = true;
let totalVisitor = 0;
let ipAddress = "";

const handlers = {
  Login: (event) => {
    if (localStorage.getItem("isLogin")) Router.push("/Admin");
    else Router.push("/Login");
  },
};

const countVisitor = async function () {
  await getVisitor();
  await getIpAddress();
  await fetch(`http://45.15.24.190:1012/count_visitor`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      visitor: totalVisitor + 1,
      ip: ipAddress,
    }),
  })
    .then((response) => response.json())
    .then(async (responseJson) => {
      console.log(responseJson);
    });
};

const getVisitor = async function () {
  await fetch(`http://45.15.24.190:1012/get_visitor`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (responseJson) => {
      totalVisitor = responseJson[0] ? responseJson[0].TOTAL : 0;
    });
};

const getIpAddress = async function () {
  await fetch("http://api.ipify.org/?format=json")
    .then((response) => response.json())
    .then((data) => {
      ipAddress = data.ip;
    });
};

export default function MyApp({ Component, pageProps }) {
  if (flag) {
    countVisitor();
    flag = false;
  }
  return (
    <React.Fragment>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Head>
          <title>specialbalibeef</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header />
        <Component {...pageProps} />
        <footer className="footer">
          <div className="footer-support">Supported By</div>
          <div className="footer-img">
            <a href="https://aciar.gov.au/">
              <img className="footer-logo" src={require("../assets/1.png")} />
            </a>
            <a href="https://www.mfat.govt.nz/en/">
              <img className="footer-logo" src={require("../assets/2.png")} />
            </a>
            <a href="https://www.pertanian.go.id/">
              <img className="footer-logo" src={require("../assets/3.png")} />
            </a>
            <a href="https://www.massey.ac.nz/">
              <img className="footer-logo" src={require("../assets/4.png")} />
            </a>
            <a href="https://unram.ac.id/">
              <img className="footer-logo" src={require("../assets/5.png")} />
            </a>
            <a href="https://www.une.edu.au/">
              <img className="footer-logo" src={require("../assets/6.png")} />
            </a>
            <a href="https://www.uq.edu.au/">
              {" "}
              <img className="footer-logo" src={require("../assets/7.png")} />
            </a>
          </div>
        </footer>
      </HotKeys>
    </React.Fragment>
  );
}
