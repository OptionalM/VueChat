# Server

This is the server component.
It runs a [Node.js](https://nodejs.org/en/) app with [Express](https://expressjs.com/) for the webserver.
It connects to a [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/).
It serves the stuff inside `../client/dist`.

### Project setup
```bash
# Install dependencies
yarn install

# Start a MongoDB server
mondod

# Run the server with hot-reload
yarn run dev
```
