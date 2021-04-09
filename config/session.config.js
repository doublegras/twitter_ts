const session = require('express-session');
const env = require(`../.env/${ process.env.NODE_ENV }`);
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const app = require('../app');

app.use(session({
  secret: 'petitsecret',
  resave: false,
  saveUninitialized: false,
  name: 'sessionName',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  store: MongoStore.create({
    mongoUrl: env.dbUrl,//mongoose.connection._connectionString
    ttl: 1000 * 60 * 60 * 24 * 14
  })
}))