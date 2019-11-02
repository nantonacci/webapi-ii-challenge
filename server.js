const express = require('express');
const postsRouter = require('./post-router.js');

const server = express();

//middleware
server.use(express.json());

//uses url to determine postsRouter should be used for routing
server.use('url', postsRouter);

//absolute path
server.get('/', (req, res) => {
  res.send(`
    <h2>Web API II Challenge</h>
    <p>it's lit</p>
  `);
});

module.exports = server;
