import React from "react";

import "./MessagesSection.scss";

class MessagesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Messages-container">
        <div className="Messages-header">
          <p>Messages</p>
        </div>
        <div className="Messages-body"></div>
      </div>
    );
  }
}

export default MessagesSection;
