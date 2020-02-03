import React from "react";

export default class ChatInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      text: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);

    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="username"
          type="text"
          autoFocus={true}
          required={true}
          value={this.state.username}
          onChange={this.handleInputChange}
        />

        <input
          name="text"
          type="text"
          required={true}
          value={this.state.text}
          onChange={this.handleInputChange}
        />

        <button
          type="submit">
          Отправить
        </button>
      </form>
    );
  }
};
