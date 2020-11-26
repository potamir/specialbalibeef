import React, { Component } from "react";
import AdminEditor from "../../../layouts/AdminEditor";
import Select from "react-select";

const options = [
  { value: "RND", label: "Reserch & Development" },
  { value: "PRODUCTS", label: "Products" },
  { value: "HISTORY", label: "History" },
  { value: "TNS", label: "Training & Mentoring" },
  { value: "IS", label: "Information System" },
];

class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: { value: "RND", label: "Reserch & Development" },
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
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

export default AddContent;
