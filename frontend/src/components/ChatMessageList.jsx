import React from "react";
import PropTypes from "prop-types";

export default class ChatMessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        text: PropTypes.string
      })
    )
  };

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
}
