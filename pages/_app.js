// import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Header from "../layouts/Header";
// import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.css";
import "./index_992.css";
import "./index_768.css";
import "../helpers/dropdown.css";
import "../helpers/modal.css";
import "../helpers/draft.css";
import "../helpers/placeholders.css";
import "../helpers/button.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>specialbalibeef</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <footer className="footer">
        <div className="footer-support">Supported By</div>
        <div className="footer-img">
          <img className="footer-logo" src={require("../assets/1.png")} />
          <img className="footer-logo" src={require("../assets/2.png")} />
          <img className="footer-logo" src={require("../assets/3.png")} />
          <img className="footer-logo" src={require("../assets/4.png")} />
          <img className="footer-logo" src={require("../assets/5.png")} />
          <img className="footer-logo" src={require("../assets/6.png")} />
          <img className="footer-logo" src={require("../assets/7.png")} />
        </div>
      </footer>
    </React.Fragment>
  );
}
