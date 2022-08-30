// Server application

const express = require('express');

const cors = require('cors');

const router = require('./routes/index');

const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);
app.set('json spaces', 2)
app.listen(5001, () => console.log('App listening on port 5001'));

