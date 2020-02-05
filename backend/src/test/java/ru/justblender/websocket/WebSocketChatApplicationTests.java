package ru.justblender.websocket;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;
import ru.justblender.websocket.config.WebSocketConfig;
import ru.justblender.websocket.model.ChatMessage;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class WebSocketChatApplicationTests {

    private final ChatMessage mockMessage = new ChatMessage("user", "hello");
    private final CompletableFuture<ChatMessage> messageFuture = new CompletableFuture<>();

    private final StompFrameHandler stompFrameHandler = new StompFrameHandler() {
        @Override
        public Type getPayloadType(StompHeaders headers) {
            return ChatMessage.class;
        }

        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
            messageFuture.complete((ChatMessage) payload);
        }
    };

    @LocalServerPort
    private int serverPort;

    @Test
    public void testCanPublishAndReceive() throws ExecutionException, InterruptedException, TimeoutException {
        StompSession stompSession = createStompSession();
        assertNotNull(stompSession);

        stompSession.subscribe(WebSocketConfig.BROKER_PREFIX + "/public", stompFrameHandler);
        stompSession.send(WebSocketConfig.ENDPOINT_PREFIX + "/publish", mockMessage);

        ChatMessage receivedMessage = messageFuture.get(5, TimeUnit.SECONDS);
        assertEquals(mockMessage, receivedMessage);
    }

    private StompSession createStompSession() throws ExecutionException, InterruptedException {
        WebSocketStompClient stompClient = new WebSocketStompClient(new SockJsClient(createTransportClient()));
        stompClient.setMessageConverter(new MappingJackson2MessageConverter());

        StompSessionHandlerAdapter sessionHandlerAdapter = new StompSessionHandlerAdapter() {};
        String webSocketUrl = "http://localhost:" + serverPort + WebSocketConfig.WS_PATH;

        return stompClient.connect(webSocketUrl, sessionHandlerAdapter).get();
    }

    private List<Transport> createTransportClient() {
        return Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()));
    }
}
