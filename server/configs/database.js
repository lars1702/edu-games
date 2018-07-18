'use strict';

require("dotenv").config();

const mongoose = require('mongoose');
// const dbName = 'edu-fun';
// || `mongodb://localhost/${dbName}`;
const mongoUri = process.env.MONGODB_URI

// connect to the database
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the database (${mongoUri})`);
});
