import React from "react";

export default class ChatMessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => (
          <li key={index}>
            {message.username}: <i>{message.text}</i>
          </li>
        ))}
      </ul>
    );
  }
};
