import React, { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {Loading} = this.props;
    return <>{Loading === true ? <div className="loader"></div> : <div></div>}</>;
  }
}

export default Loading;
