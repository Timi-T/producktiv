// Handle endpoints for API

const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/api/users', (req, res) => {
  UserController.createUser(req, res);
});

module.exports = router;
