const express = require('express');
const readerRouter = require('./routes/reader');
const app = express();

app.use(express.json());

app.use('/readers', readerRouter);

module.exports = app;
