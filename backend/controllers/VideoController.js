// This endpoints will be created for video

const uuid = require('uuid').v4;
const Video = require('../dataObjects/videoObject');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const { ObjectId } = require('mongodb');


// This call back will upload a video and add it to the user's video as well
exports.createVideo = async (request, response) => {
  const cookie = request.cookies.auth_key;
  const userId = await redisClient.get(`auth_${cookie}`);
  const { videoName } = request.body;
  const { description } = request.body;
  const { category } = request.body;
  const { videoLink } = request.body;
  const uploadDate = new Date().toJSON();
  const video = new Video(videoName, userId, uploadDate, description, category, videoLink);
  const vid = await dbClient.postVideo('videos', video);
  if (vid !== 'Video Exists') {
    const findUser = { _id: ObjectId(userId) };
    const get = await dbClient.get('users', findUser);
    if (get) {
      await dbClient.client.db('producktiv').collection('users').updateOne({ _id: ObjectId(userId) }, { $push: { videos: vid[0] } });
      response.status(201).send('Uploaded video');
    } else {
      response.status(401).send({ error: 'Unauthorized' });
    }
  } else {
    response.status(300).send('Video Exists')
  }
};

// This callback function will get a video from database
exports.getVideo = async (request, response) => {
  const { id } = request.params;
  const video = await dbClient.get('videos', { _id: ObjectId(id) });
  if (video) {
    const vid = uuid();
    const key = `vid_${vid}`;
    await redisClient.set(key, id.toString());
    response.status(200).send(video);
  } else {
    response.status(401).send({ error: 'Video Unauthorized' });
  }
};

// This callback function will delete a video from database
// and from the list of videos of a user
exports.deleteVideo = async (request, response) => {
  const { id } = request.params;
  const cookie = request.cookies.auth_key;
  const userId = await redisClient.get(`auth_${cookie}`);
  const user = await dbClient.get('users', { _id: ObjectId(userId) });
  for (const vid of user.videos) {
    if (vid._id == id) {
      await dbClient.client.db('producktiv').collection('users').updateOne({ _id: ObjectId(userId) }, { $pull: { videos: vid } });
    }
  }
  const video = await dbClient.del('videos', { _id: ObjectId(id) });
  if (video === 'Deleted') {
    response.status(200).send('Video Deleted');
  } else {
    response.status(401).send({ error: 'Video Doesn\'t exists' });
  }
};
