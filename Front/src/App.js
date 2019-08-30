import React from "react";

import "./App.css";

//------------------------Porject Components-------------------------------
import MessagesSection from "./Components/MessagesSection/MessagesSection.js";
import ContactFilePage from "./Pages/ContactFilePage/ContactFilePage.js";
import CasePage from "./Pages/CasePage/CasePage.js";
//------------------------Porject Components-------------------------------//

import { Route, Switch, withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactId: " "
    };
  }



  EnterCaseFile = async id => {
    const add = await this.setState({ contactId: id });
    return add;
  };

  leaveCaseFile = () => {
    this.setState({ contactId: "" });
  };

  render() {
    const { contactId } = this.state;
    return (
      <div className="App-container">
        <MessagesSection />
        <Switch>
          <Route
            exact={true}
            path="/"
            render={() => {
              return <ContactFilePage EnterCaseFile={this.EnterCaseFile} />;
            }}
          />
          <Route
            exact={true}
            path={`/case/${contactId}`}
            render={() => {
              return (
                <CasePage
                  leaveCaseFile={this.leaveCaseFile}
                  contactId={contactId}
                />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
