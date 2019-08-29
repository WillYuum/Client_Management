import React from "react";

import "./App.css";

import MessagesSection from "./Components/MessagesSection/MessagesSection.js";
import ContactFilePage from "./Pages/ContactFilePage/ContactFilePage.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App-container">
        <MessagesSection />
        <ContactFilePage />
      </div>
    );
  }
}

export default App;
