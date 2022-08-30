// Authenticate a request

const sha1 = require('sha1');
const uuid = require('uuid').v4;
const db = require('../utils/db');
const redisClient = require('../utils/redis');
const { ObjectId } = require('mongodb');

class AuthController {

  async loginUser (req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const user = await db.get('users', { email, password: sha1(password) });
    if (user) {
      const authKey = uuid();
      res.cookie('auth_key', authKey, { maxAge: 86400, sameSite: 'strict' });
      redisClient.set(`auth_${authKey}`, String(user._id));
      res.status(200).send(authKey);
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }

  async sessionAuth(req, res) {
    const { auth_key } = req.cookies
    const user_id = await redisClient.get(`auth_${auth_key}`);
    if (user_id) {
      return true;
    }
    return false;
  }
}

module.exports = new AuthController();
