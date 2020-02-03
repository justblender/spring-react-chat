package ru.justblender.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ru.justblender.websocket.model.ChatMessage;

@Controller
public class ChatRoomController {

    @MessageMapping("/broadcast")
    @SendTo("/rooms/global")
    public ChatMessage broadcastMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }
}
