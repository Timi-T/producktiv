// This script will deal with video retrieval of categories

const Auth = require('./AuthController');
const dbClient = require('../utils/db');

// This function will give videos of the same category
exports.getCategoryVideos = async (request, response) => {
  // Validation of a cookie and user
  const validateRequest = await Auth.sessionAuth(request, response);
  if (!validateRequest) {
    response.status(401).send({ message: 'Cookie Expired' });
  } else {
    const { name } = request.params;
    // Retrieving category
    const category = await dbClient.get('categories', { name });
    if (category) {
      // Returns the videos of the category
      response.status(200).send({ videos: category.videos });
    } else {
      response.status(404).send({ error: 'Category Doesn\'t exist' });
    }
  }
};
