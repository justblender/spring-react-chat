package ru.justblender.websocket.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ru.justblender.websocket.config.WebSocketConfig;
import ru.justblender.websocket.model.ChatMessage;

@Controller
public class ChatRoomController {

    @MessageMapping("/publish")
    @SendTo(WebSocketConfig.BROKER_PREFIX + "/public")
    public ChatMessage broadcastMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
