const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-Parser');
require('dotenv').config();
const routes = require('./routes/index.js');
const {
    errorHandler,
    errorLogger,
} = require('./middlewares/error-hander.middleware');

const app = express();

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/', routes);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

const PORT = process.env.EXPRESS_PORT;
app.listen(PORT, () => {
    console.log(`Server start at ${PORT}`);
});
