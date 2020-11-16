import React, { Component } from "react";
import Link from "next/link";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { html, setId, comName } = this.props;
    return (
      <div className="list-item-main-div">
        <div className="list-item-inner-div">
          {html.map((value, index) => {
            return (
              <Link href={`/${comName}?id=${value.ID}`}>
                <div className="list-item-wrapper" onClick={() => setId(index)}>
                  <div className="list-item-title">
                    <p>Title</p>
                  </div>
                  <div className="list-item-image-div">
                    <img
                      className="list-item-image"
                      src="https://i.imgur.com/OsvZsXT.jpg"
                    />
                  </div>
                  <div> Item {value.ID} </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ListItems;
