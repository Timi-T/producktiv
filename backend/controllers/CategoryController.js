// This script will deal with video retrieval of categories

const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

exports.getCategoryVideos = async (request, response) => {
  const { name } = request.params;
  const values = await redisClient.get(name);
  if (!values) {
    const category = await dbClient.get('categories', { name });
    if (category) {
      const lists = category.videos;
      await redisClient.setCategory(name, JSON.stringify(lists));
      response.status(200).send(category.videos);
    } else {
      response.status(401).send({ error: 'Category Doesn\'t exist'});
    }
  } else {
    response.status(200).send(values);
  }
};
