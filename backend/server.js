// Server application

const express = require('express');

const cors = require('cors');

const router = require('./routes/index');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(cors({
  origin: '*'
}));
app.listen(5001, () => console.log('App listening on port 5001'));

