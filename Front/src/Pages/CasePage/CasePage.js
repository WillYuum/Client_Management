import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CasePage.scss";

import CaseFile from "../../Components/CaseFile/CaseFile.js";

class CasePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CaseData: []
    };
  }
  componentWillMount= ()=>{
    this.getCase(this.props.contactId)
  }

  getCase = async id => {
    if (!id) {
      throw new Error(`fetching cases with id = ${id} failed`);
    }
    try {
      const req = await fetch(`http://localhost:3001/case/read/${id}`, {});
      const result = await req.json();
      this.setState({ CaseData: result.result });
    } catch (err) {
      throw new Error("getting cases faied");
    }
  };

  render() {
    console.log("check here willy",this.props.contactId)
    console.log(this.state.CaseData);
    const { CaseData } = this.state;
    const { leaveCaseFile } = this.props;
    return (
      <div className="CasePage-container">
        <Link to="/">
          <Button variant="dark" onClick={() => leaveCaseFile()}>
            Go Back
          </Button>
        </Link>
        {CaseData.map(caseFile => {
          return (
            <CaseFile
              caseId={caseFile.caseId}
              caseTitle={caseFile.caseTitle}
              caseType={caseFile.caseType}
              status={caseFile.status}
              dateCreated={caseFile.dateCreated}
            />
          );
        })}
      </div>
    );
  }
}

export default CasePage;
