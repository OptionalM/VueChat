# Server

This is the server component.
It runs a [Node.js](https://nodejs.org/en/) app with [Express](https://expressjs.com/) for the webserver.
It connects to a [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/).
It serves the stuff inside `../client/dist`.

## Project setup
```bash
yarn install
```
installs all the needed dependencies.


Start a MongoDB server.
Then you can run the server with hot-reload by using
```bash
yarn run dev
```
