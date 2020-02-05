import React from "react";
import PropTypes from "prop-types";

export default class ChatInputForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  };

  state = {
    username: "",
    text: ""
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.setState({
      text: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            autoFocus={true}
            required={true}
            value={this.state.username}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="text">Message:</label>
          <input
            id="text"
            type="text"
            required={true}
            value={this.state.text}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <button type="submit" disabled={this.props.disabled}>
            Send
          </button>
        </div>
      </form>
    );
  }
}
