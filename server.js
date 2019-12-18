const express = require('express');
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/db-config.js')


const ProjectRouter = require('./projects/project-router.js');
const AuthRouter = require('./projects/user-router.js');

const server = express();

const sessionConfig = {
    name: 'kimchi',
    secret: 'kimchi stew is good',
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    },
    resave:false,
    saveUninitialized:false,

    store: new KnexSessionStore({
        
        knex: db,
        createtable: true,
        clearInterval: 1000 * 60 * 10,
        sidfieldname: "sid",
        tablename: "sessions",
      })
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());
server.use('/api/projects', ProjectRouter);
server.use('/api/user', AuthRouter);

module.exports = server;