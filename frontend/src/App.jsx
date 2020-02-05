import React from "react";
import SockJS from "sockjs-client";
import StompJS from "stompjs";

import ChatInputForm from "./components/ChatInputForm";
import ChatMessageList from "./components/ChatMessageList";

const WEBSOCKET_URL = "http://localhost:8080/ws";
const RECONNECT_DELAY = 3 * 1000;

const PUBLIC_TOPIC = "/topic/public";
const PUBLISH_ENDPOINT = "/chat/publish";

export default class App extends React.Component {
  state = {
    connected: false,
    messages: []
  };

  componentDidMount() {
    this.createConnection();
  }

  createConnection = () => {
    let connectCallback = () => {
      this.client.subscribe(PUBLIC_TOPIC, this.handleMessage);

      this.setState({
        connected: true
      });
    };

    let errorCallback = () => {
      window.setTimeout(() => this.createConnection(), RECONNECT_DELAY);
    };

    // Make sure previous connection is closed
    this.closeConnection();

    // Create new StompJS client
    this.client = StompJS.over(new SockJS(WEBSOCKET_URL));
    this.client.connect({}, connectCallback, errorCallback);
  };

  closeConnection = () => {
    if (this.client) {
      this.client.disconnect();
      this.client = null;
    }

    this.setState({
      connected: false
    });
  };

  handleMessage = (payload) => {
    if (payload.body) {
      this.setState((prevState) => ({
        messages: [...prevState.messages, JSON.parse(payload.body)]
      }));
    }
  };

  publishMessage = (payload) => {
    if (this.client) {
      this.client.send(PUBLISH_ENDPOINT, {}, JSON.stringify(payload));
    }
  };

  componentWillUnmount() {
    this.closeConnection();
  }

  render() {
    return (
      <div className="app">
        {!this.state.connected && (
          <div className="not-connected">
            <h1>You're not connected to WS server :(</h1>
          </div>
        )}

        <ChatInputForm
          onSubmit={this.publishMessage}
          disabled={!this.state.connected}
        />

        <ChatMessageList messages={this.state.messages} />
      </div>
    );
  }
}
