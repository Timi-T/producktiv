// Logic for user related endpoints

const Auth = require('./AuthController');
const dbClient = require('../utils/db');
const { ObjectId } = require('mongodb');
const redisClient = require('../utils/redis');
const User = require('../dataObjects/userObject');

class UserController {
  // This function will create a user
  async createUser (req, res) {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    // Checks whether the above variables are gicen or not
    const validateError = this.validateData(username, email, password);
    if (!validateError) {
      // Create a user and add it to a database and verify scenarios
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

  // This function will check if the parameters are present or not
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
    // Validates cookies and users exists
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ message: 'Cookie Expired' });
    } else {
      // Get the user based on the the cookie
      const cookie = request.cookies.auth_key;
      const key = `auth_${cookie}`;
      const userId = await redisClient.get(key);
      // Retrieve all the videos and loop over the videos to find and delete the video whose
      // userId is the same as user we got from cookie
      const videos = await dbClient.getVideos('videos');
      for (const vid of videos) {
        if (vid.userId === userId) {
          const del = { userId };
          const video = await dbClient.del('videos', del);
        }
      }
      const categories = ['Programming', 'Arts', 'Life Style', 'Business'];
      for (const category of categories) {
      // Videos from a specific category are looped over to find and delete the video whose
      // userId is the same as user we got from cookie
        const categ = await dbClient.get('categories', { name: category });
        const videos = categ.videos;
        for (const vid of videos) {
          if (vid.userId === userId) {
            await dbClient.client.db('producktiv').collection('categories').updateOne({ name: category }, { $pull: { videos: vid } });
          }
        }
      }
      // Delete a user from database based on the userId and delete key from redis
      const given = { _id: ObjectId(userId) };
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
    // Validate cookie and user existance
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ message: 'Cookie Expired' });
    } else {
      // Use the cookie value to remove the key from redis to expire it
      const cookie = request.cookies.auth_key;
      const key = `auth_${cookie}`;
      await redisClient.del(key);
      response.clearCookie('auth_key');
      response.status(200).send({ message: 'GoodBye' });
    }
  }

  // This endpoint will be used to get all users 20 at time
  async allUser (request, response) {
    // Get the page number or 0 if not given
    const page = request.query.page || 0;
    // Returns Users based on page number except the email and password of the user
    const users = await dbClient.getAll('users', page);
    users.forEach(user => {
      delete user.email;
      delete user.password;
    });
    response.send({ users });
  }

  // Get all videos posted by a user
  async getUserVideos (request, response) {
    // Validates cookie and user
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ message: 'Cookie Expired' });
    } else {
      // Get cookie value then retrieve user and it's videos
      const cookie = request.cookies.auth_key;
      const userId = await redisClient.get(`auth_${cookie}`);
      const user = await dbClient.get('users', { _id: ObjectId(userId) });
      response.status(200).send({ videos: user.videos });
    }
  }
}

module.exports = new UserController();
