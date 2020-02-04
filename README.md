# spring-react-chat

`backend/` contains source code for WebSocket server written using Spring framework, `frontend/` contains source code for a basic web application, written using React, that communicates with WebSocket server and contains basic functionality for a global chat.

## Building

- Run `./gradlew build` in `backend/` to build a WS server;
- Run `npm run build` in `frontend/` to create a production build of a web application.

This way you'll get two separate packages that need to be run/served independently.

Spring Boot can serve static content out-of-the-box, simply pass `--spring.resources.static-locations=PATH` argument to the server JAR on startup, where `PATH` is a path to `frontend/build/` folder that contains built frontend files.
