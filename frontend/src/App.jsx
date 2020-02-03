import React from "react";
import SockJS from "sockjs-client";
import StompJS from "stompjs";

import ChatInputForm from "./components/ChatInputForm";
import ChatMessageList from "./components/ChatMessageList";

const BROKER_URL = "http://localhost:8080/ws";
const GLOBAL_ROOM = "/rooms/global";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.createConnection();
  }

  createConnection = () => {
    // Make sure previous connection is closed
    this.closeConnection();

    // Create new StompJS client
    this.client = StompJS.over(new SockJS(BROKER_URL));
    this.client.connect({}, () => this.client.subscribe(GLOBAL_ROOM, this.handleMessage));
  }

  closeConnection = () => {
    if (this.client) {
      this.client.disconnect();
      this.client = null;
    }

    this.setState({
      connected: false
    });
  }

  handleMessage = (payload) => {
    if (payload.body) {
      this.setState((prevState) => ({
        messages: [...prevState.messages, JSON.parse(payload.body)]
      }));
    }
  }

  publishMessage = (payload) => {
    if (this.client) {
      this.client.send(GLOBAL_ROOM, {}, JSON.stringify(payload));
    }
  }

  componentWillUnmount() {
    this.closeConnection();
  }

  render() {
    return (
      <div className="app">
        <ChatInputForm
          onSubmit={this.publishMessage}
        />

        <ChatMessageList
          messages={this.state.messages}
        />
      </div>
    );
  }
}
