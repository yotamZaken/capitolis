const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

// Load all env vars
require('dotenv').config()


const {DB_URI, SERVER_PORT} = require('./helpers/projectConstants');
const { transactionsRouter } = require('./routes/transactionsRoute');


// DB connection set-up
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
    console.log('Connected Successfully to DB');
});

// Setting up Express
const app = express();
app.use(express.json());
app.use(cors());
app.use(require('express-bunyan-logger')({
    name: 'logger',
    streams: [{
        level: 'info',
        stream: process.stdout
    }]
}));
app.use('/transactions', transactionsRouter);

// Basic end point for a sanity check
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
})