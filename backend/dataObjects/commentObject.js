// create a comment object

class Comments {
  constructor(userId, comment, postedDate) {
    this.userId = userId;
    this.comment = comment;
    this.postedDate = postedDate;
  }
}

module.exports = Comments;