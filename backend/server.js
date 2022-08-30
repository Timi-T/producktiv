// Server application

const express = require('express');

const router = require('./routes/index');

const app = express();
app.use(express.json());
app.use(router);
app.listen(5001, () => console.log('App listening on port 5000'));
