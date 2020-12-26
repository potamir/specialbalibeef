import React, { Component } from "react";
import disableScroll from "disable-scroll";

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { Loading } = this.props;
    if (Loading) disableScroll.on();
    else disableScroll.off();
    return (
      <>
        {Loading === true ? (
          <div className="loader-div">
            <div className="loader"></div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default Loading;
