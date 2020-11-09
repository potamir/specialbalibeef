import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, Modifier } from "draft-js";
import { RichUtils } from "draft-js";

class Placeholders extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };
  state = {
    open: false,
  };

  openPlaceholderDropdown = () => this.setState({ open: !this.state.open });

  addPlaceholder = (fontSize) => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    if (newState) {
      onChange(newState);
    }
  };

  placeholderOptions = [
    { key: "small", value: "100px", text: "Small" },
    { key: "medium", value: "200px", text: "Medium" },
    { key: "large", value: "1.2rem", text: "Large" },
    { key: "xlarge", value: "1.5rem", text: "Xtra Large" },
    { key: "largest", value: "2rem", text: "largest" },
  ];

  listItem = this.placeholderOptions.map((item) => (
    <li
      onClick={this.addPlaceholder.bind(this, item.value)}
      key={item.key}
      className="rdw-dropdownoption-default placeholder-li"
    >
      {item.text}
    </li>
  ));

  render() {
    return (
      <div
        onClick={this.openPlaceholderDropdown}
        className="rdw-block-wrapper"
        aria-label="rdw-block-control"
      >
        <div
          className="rdw-dropdown-wrapper rdw-block-dropdown"
          aria-label="rdw-dropdown"
        >
          <div className="rdw-dropdown-selectedtext" title="Placeholders">
            <span>Placeholder</span>
            <div
              className={`rdw-dropdown-caretto${
                this.state.open ? "close" : "open"
              }`}
            ></div>
          </div>
          <ul
            className={`rdw-dropdown-optionwrapper ${
              this.state.open ? "" : "placeholder-ul"
            }`}
          >
            {this.listItem}
          </ul>
        </div>
      </div>
    );
  }
}

export default Placeholders;
