// Logic for user related endpoints

const User = require('../dataObjects/userObject');
const db = require('../utils/db');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const Auth = require('./AuthController');
const { ObjectId } = require('mongodb');

class UserController {
  async createUser (req, res) {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const validateError = this.validateData(username, email, password);
    if (!validateError) {
      const user = new User(username, email, password);
      const savedUser = await dbClient.post('users', user);
      if (savedUser === 'Saved') {
        res.status(201).send({ success: true });
      } else if (savedUser === 'User exists') {
        res.status(400).send({ error: 'User exists' });
      } else {
        res.status(400).send({ error: 'Unknown error' });
      }
    } else {
      res.status(400).send(validateError);
    }
  }

  validateData (username, email, password) {
    this.username = username;
    if (!username) {
      return { error: 'Missing username' };
    }
    if (!email) {
      return { error: 'Missing email' };
    }
    if (!password) {
      return { error: 'Missing password' };
    }
    return false;
  }

  // This endpoint will be used to delete a user
  async deleteUser (request, response) {
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ message: 'Cookie Expired' });
    } else { 
      let cookie = request.cookies.auth_key;
      if (!cookie) {
        cookie = req.query.auth_key;
      }
      const key = `auth_${cookie}`;
      const userId = await redisClient.get(key);
      const given = { _id: ObjectId(userId) };
      const videos = await dbClient.getVideos('videos');
      for (const vid of videos) {
        if (vid.userId === userId) {
          const del = { userId };
          const video = await dbClient.del('videos', del);
	}
      }
      const categories = ['Programming', 'Arts', 'Life Style', 'Business'];
      for (const category of categories) {
        const categ = await dbClient.get('categories', { name: category });
        const videos = categ.videos;
	for (const vid of videos) {
          if (vid.userId === userId) {
            await dbClient.client.db('producktiv').collection('categories').updateOne({ name: category }, { $pull: { videos: vid } });
	  }
	}
      }
      const user = await dbClient.del('users', given);
      if (user === 'Deleted') {
        await redisClient.del(key);
        response.clearCookie('auth_key');
        response.status(200).send({ message: 'User Deleted' });
      } else {
        response.status(401).send({ error: 'User does not exist' });
      }
    }
  }

  // This endpoint will be used to delete a token when a
  // user logs out
  async deleteToken (request, response) {
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ message: 'Cookie Expired' });
    } else {
      let cookie = request.cookies.auth_key;
      if (!cookie) {
        cookie = req.query.auth_key;
      }
      const key = `auth_${cookie}`;
      await redisClient.del(key);
      response.clearCookie('auth_key');
      response.status(200).send({ message: 'GoodBye' });
    }
  }

  // This endpoint will be used to get all users 20 at time
  async allUser (request, response) {
    const page = request.query.page || 0;
    const users = await dbClient.getAll('users', page);
    users.forEach(user => {
      delete user.email;
      delete user.password;
    });
    response.send({ users });
  }

  // Get all videos posted by a user
  async getUserVideos (request, response) {
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ message: 'Cookie Expired' });
    } else {
      let cookie = request.cookies.auth_key;
      if (!cookie) {
        cookie = req.query.auth_key;
      }
      const userId = await redisClient.get(`auth_${cookie}`);
      const user = await dbClient.get('users', { _id: ObjectId(userId) });
      response.status(200).send({ videos: user.videos });
    }
  }
};

module.exports = new UserController();
