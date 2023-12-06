require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');

server.listen(PORT, async () => {
  try {
    await client.connect();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  console.log("The server is up on port", PORT);
});