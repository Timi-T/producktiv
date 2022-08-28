// Handle endpoints for API

const express = require('express');

const router = express.Router();

const UserController = require('../controllers/UserController');

router.post('/api/users', (req, res) => {
  UserController.createUser(req, res);
});

router.delete('/api/users/:id', UserController.deleteUser);

router.delete('/api/users/logout', UserController.deleteToken);

router.get('/api/users', UserController.allUser);

module.exports = router;
