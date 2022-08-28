// Logic for user related endpoints

const sha1 = require('sha1');
const uuid = require('uuid').v4;
const User = require('../dataObjects/userObject');
const db = require('../utils/db');

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class UserController {
  async createUser(req, res) {
    const { username } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const validateError = this.validateData(username, email, password);
    if (!validateError) {
      const user = new User(username, email, password);
      const savedUser = await dbClient.post('users', user);
      if (savedUser === 'Saved') {
        res.status(201).send({ email });
      } else if (savedUser === 'User exists') {
        res.status(400).send({ error: 'User exists' });
      } else {
        res.status(400).send({ error: 'Unknown error' });
      }
    } else {
      res.status(400).send(validateError);
    }
  }

  validateData(username, email, password) {
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

  async loginUser(req, res) {
    const { email } = req.body;
    const { password } = req.body;
    this.email = email;
    const user = await db.get('users', { email, password: sha1(password) });
    if (user) {
      const authKey = uuid();
      res.cookie('auth_key', authKey);
      redisClient.set(`auth_${authKey}`, String(user._id));
      res.status(200).send(authKey);
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }
}

module.exports = new UserController();
