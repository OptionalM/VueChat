# Server

This is the server component.
It runs a [Node.js](https://nodejs.org/en/) app with [Express](https://expressjs.com/) for the webserver.
It connects to a [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/).
It serves the stuff inside `../client/dist`.

Using [Socket.io](https://socket.io/) it serves the chat functionality.

### Project setup
```bash
# Create a .env like the .env.example and fill it with your information.

# Install dependencies
yarn install

# Start a MongoDB server
mondod

# Run the server with hot-reload
yarn run dev
```
