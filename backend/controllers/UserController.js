// Logic for user related endpoints

const User = require('../dataObjects/userObject');

const dbClient = require('../utils/db');

class UserController {
  async createUser(req, res) {
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const validateError = this.validateData(firstname, lastname, email, password);
    if (!validateError) {
      const user = new User(firstname, lastname, email, password);
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

  validateData(firstname, lastname, email, password) {
    this.firstname = firstname;
    if (!firstname) {
      return { error: 'Missing firstname' };
    }
    if (!lastname) {
      return { error: 'Missing lastname' };
    }
    if (!email) {
      return { error: 'Missing email' };
    }
    if (!password) {
      return { error: 'Missing password' };
    }
    return false;
  }
}

module.exports = new UserController();
