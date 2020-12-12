import React, { Component } from "react";

class Pagination extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { totalRows, paginationSelect, active } = this.props;
    const rowsEachPage = Math.ceil(totalRows / 2);
    const rows = Array.from(Array(rowsEachPage + 1).keys());
    console.log(rows);
    return (
      <div class="center">
        <div class="pagination">
          <a href="#">&laquo;</a>
          {rows.splice(1, rows.length).map((value, index) => {
            const activePag = active == value ? "active" : "";
            return (
              <a
                class={`${activePag}`}
                onClick={() => paginationSelect(value)}
              >
                {value}
              </a>
            );
          })}
          <a href="#">&raquo;</a>
        </div>
      </div>
    );
  }
}

export default Pagination;
