// Server application

const express = require('express');

const cors = require('cors');

const router = require('./routes/index');

const cookieParser = require('cookie-parser');

const app = express();


app.use(cors({
  origin: ['https://producktiv.netlify.app', 'http://localhost:3000'],
  credentials: true
}));

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.listen(5001, () => console.log('App listening on port 5001'));
