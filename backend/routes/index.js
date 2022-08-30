// Handle endpoints for API

const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const VideoController = require('../controllers/VideoController');

// User Related API

router.post('/api/users', (req, res) => {
  UserController.createUser(req, res);
});

router.post('/api/login', AuthController.loginUser);

router.delete('/api/users/:id', UserController.deleteUser);

router.delete('/api/logout', UserController.deleteToken);

router.get('/api/users', UserController.allUser);

// Video related API

router.post('/api/videos', VideoController.createVideo);

//router.get('/api/videos/:username', VideoController.getUserVideos);

router.get('/api/videos/:id', VideoController.getVideo);

router.delete('/api/videos/:id', VideoController.deleteVideo);

module.exports = router;
