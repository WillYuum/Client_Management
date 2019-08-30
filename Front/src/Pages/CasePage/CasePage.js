import React from "react";

import "./CasePage.sass";

import CaseFile from "../../Components/CaseFile/CaseFile.js";

class CasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="CasePage-container">
        <CaseFile />
      </div>
    );
  }
}

export default CasePage;
