const express = require('express');

const ProjectRouter = require('./projects/project-router.js');
const AuthRouter = require('./projects/user-router.js');

const server = express();

server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/user', AuthRouter);

module.exports = server;