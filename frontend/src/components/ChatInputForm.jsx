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
      [event.target.id]: event.target.value
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
        <div>
          <label htmlFor="username">
            Имя пользователя:
          </label>

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
          <label htmlFor="text">
            Сообщение:
          </label>

          <input
            id="text"
            type="text"
            required={true}
            value={this.state.text}
            onChange={this.handleInputChange}
          />
        </div>

        <button
          type="submit"
          disabled={this.props.disabled}>
          Отправить сообщение
        </button>
      </form>
    );
  }
};
