// Create a user object

const sha1 = require('sha1');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.password = this.hashPwd();
    this.videos = [];
    this.notes = [];
    this.articles = [];
    this.ratings = [];
    this.avgRating = 0;
  }

  hashPwd() {
    const hashedPwd = sha1(this.password);
    return hashedPwd;
  }
}

module.exports = User;
