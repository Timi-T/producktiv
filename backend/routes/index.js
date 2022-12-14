// Handle endpoints for API

const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const VideoController = require('../controllers/VideoController');
const CategoryController = require('../controllers/CategoryController');

// User Related API

router.post('/api/users', (req, res) => {
  UserController.createUser(req, res);
});

router.post('/api/login', AuthController.loginUser);

router.delete('/api/users/flush', UserController.deleteUser);

router.delete('/api/logout', UserController.deleteToken);

router.get('/api/users', UserController.allUser);

router.get('/api/users/videos', UserController.getUserVideos);

// Video related API

router.post('/api/videos', VideoController.createVideo);

router.get('/api/videos', VideoController.getAllVideos);

router.get('/api/videos/:id', VideoController.getVideo);

router.delete('/api/videos/:id', VideoController.deleteVideo);

// Category related API

router.get('/api/categories/:name', CategoryController.getCategoryVideos);

module.exports = router;
