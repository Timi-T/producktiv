// Authenticate a request

const sha1 = require('sha1');
const uuid = require('uuid').v4;
const db = require('../utils/db');
const redisClient = require('../utils/redis');
const { ObjectId } = require('mongodb');

class AuthController {

  async loginUser (req, res) {
    const auth = req.headers.authorization;
    const basic = auth.split(' ')[1];
    const decoded = Buffer.from(basic, 'base64').toString('binary');
    const values = decoded.split(':');
    const email = values[0];
    const password = values[1];
    const user = await db.get('users', { email, password: sha1(password) });
    if (user) {
      const authKey = uuid();
      res.cookie('auth_key', authKey, { maxAge: 1000 * 60 * 60 * 24, sameSite: 'none', secure: true });
      redisClient.set(`auth_${authKey}`, String(user._id));
      user.token = authKey;
      res.status(200).send({ user });
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }

  async sessionAuth(req, res) {
    const { auth_key } = req.cookies
    const userId = await redisClient.get(`auth_${auth_key}`);
    if (userId) {
      return true;
    }
    return false;
  }
}

module.exports = new AuthController();
