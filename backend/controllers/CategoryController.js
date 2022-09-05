// This script will deal with video retrieval of categories

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const Auth = require('./AuthController');

exports.getCategoryVideos = async (request, response) => {
  const validateRequest = await Auth.sessionAuth(request, response);
  if (!validateRequest) {
    response.status(401).send({ message: 'Cookie Expired' });
  } else {
    const { name } = request.params;
    const values = await redisClient.get(name);
    if (!values) {
      const category = await dbClient.get('categories', { name });
      if (category) {
        const lists = category.videos;
        await redisClient.setCategory(name, JSON.stringify(lists));
        response.status(200).send({ videos: category.videos });
      } else {
        response.status(404).send({ error: 'Category Doesn\'t exist' });
      }
    } else {
      const videos = JSON.parse(values);
      response.status(200).send({ videos });
    }
  }
};
