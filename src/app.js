const express = require("express")
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const dotenv = require("dotenv")
dotenv.config()

const middlewares = require('./middlewares');
const api = require('./api');

const app = express()

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", api)
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;