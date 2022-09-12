// Authenticate a request

const db = require('../utils/db');
const redisClient = require('../utils/redis');
const sha1 = require('sha1');
const uuid = require('uuid').v4;

class AuthController {
  // This function will login a user by creating a session cookie
  async loginUser (req, res) {
    // Decoding basic authentication and getting email and password
    const auth = req.headers.authorization;
    const basic = auth.split(' ')[1];
    const decoded = Buffer.from(basic, 'base64').toString('binary');
    const values = decoded.split(':');
    const email = values[0];
    const password = values[1];
    // Get user of that email and password
    const user = await db.get('users', { email, password: sha1(password) });
    if (user) {
      const authKey = uuid();
      // Set a cookie whose value is the above uuid. This cookie stays for 1 day and
      // should only be accepted if it is coming from the same browser always
      res.cookie('auth_key', authKey, { maxAge: 1000 * 60 * 60 * 24, sameSite: 'strict' });
      // Save cookie value as a key on redis to represent the userID
      redisClient.set(`auth_${authKey}`, String(user._id));
      user.token = authKey;
      // Return all user informtion and it's cookie value
      res.status(200).send({ user });
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  }

  // This function will check if a cookie exists and if there is a userID linked to it
  async sessionAuth (req, res) {
    const { auth_key } = req.cookies;
    const userId = await redisClient.get(`auth_${auth_key}`);
    if (userId) {
      return true;
    }
    return false;
  }
}

module.exports = new AuthController();
