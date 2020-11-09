import React, { Component } from "react";
import Link from "next/link";

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    const { html, setId } = this.props;
    return (
      <ul>
        {html.map((value, index) => {
          return (
            <Link href={`/Products?id=${value.ID}`}>
              <li onClick={() => setId(index)}> Item {value.ID} </li>
            </Link>
          );
        })}
      </ul>
    );
  }
}

export default ListItems;
