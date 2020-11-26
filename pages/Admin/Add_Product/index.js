import React, { Component } from "react";
import AdminEditor from "../../../layouts/AdminEditor";
import Select from "react-select";

const options = [
  { value: "RND", label: "Reserch & Development" },
  { value: "PRODUCTS", label: "Products" },
  { value: "HISTORY", label: "History" },
];

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "RND", label: "Reserch & Development" },
    };
  }

  handleChange = (selectedOption) => {
    console.log(selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <div>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <AdminEditor page={selectedOption.value} />
      </>
    );
  }
}

export default AddProduct;
