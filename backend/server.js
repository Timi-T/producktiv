// Server application

const express = require('express');

const cors = require('cors');

const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(router);
app.use(cors());
app.listen(5001, () => console.log('App listening on port 5001'));
