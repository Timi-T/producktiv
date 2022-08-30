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
        res.status(201).send();
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
    const { id } = request.params;
    const cookie = request.cookies;
    const value = cookie.auth_key;
    const user_id = await redisClient.get(value);
    if (user_id !== id) {
      response.status(401).send({ error: 'You do not have the permissions to delete this user' });
      return;
    }
    const given = { _id: ObjectId(id) };
    const key = `auth_${value}`;
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ error: 'Unauthorized User' });
      return;
    }
    const user = await dbClient.del('users', given);
    if (user === 'Deleted') {
      await redisClient.del(key);
      response.clearCookie('auth_key');
      response.status(204).send({ message: 'User Deleted' });
    } else {
      response.status(400).send({ error: 'User does not exist' });
    }
  }

  // This endpoint will be used to delete a token when a
  // user logs out
  async deleteToken (request, response) {
    const cookie = request.cookies;
    const value = cookie.auth_key;
    const key = `auth_${value}`;
    const validateRequest = await Auth.sessionAuth(request, response);
    if (!validateRequest) {
      response.status(401).send({ error: 'Unauthorized User' });
      return;
    }
    await redisClient.del(key);
    response.clearCookie('auth_key');
    response.status(204).send({ message: 'GoodBye' });
  }

  // This endpoint will be used to get all users 20 at time
  async allUser (request, response) {
    const page = request.query.page || 0;
    const users = await dbClient.getAll('users', page);
    users.forEach(user => {
      delete user.email;
      delete user.password;
    });
    response.send(users);
  }
}

module.exports = new UserController();
