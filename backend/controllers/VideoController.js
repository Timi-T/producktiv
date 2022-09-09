// This endpoints will be created for video

const uuid = require('uuid').v4;
const util = require('util');
const request = require('request');
const Video = require('../dataObjects/videoObject');
const Category = require('../dataObjects/categoryObject');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');
const Auth = require('./AuthController');
const { ObjectId } = require('mongodb');
require('dotenv').config();
const APIKEY = process.env.API_KEY;


// This function will get the id of a video link
async function getId(url) {
  const getURL = util.promisify(request.get).bind(request);
  const jsons = await getURL(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${url}&key=${APIKEY}`);
  const data = JSON.parse(jsons.body);
  const items = data.items[0];
  return items;
}

// Function to validate a submitted link
async function getVideoObj (url) {
  try {
    const items = await getId(url);
    const vidId = items.id.videoId;
    const getURL = util.promisify(request.get).bind(request);
    const jsons = await getURL(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${vidId}&key=${APIKEY}`);
    return JSON.parse(jsons.body);
  } catch (error) {
    console.log(error);
  }
}

// This call back will upload a video and add it to the user's video as well
// and categories video list
exports.createVideo = async (request, response) => {
  const validateRequest = await Auth.sessionAuth(request, response);
  if (!validateRequest) {
    response.status(401).send({ message: 'Cookie Expired' });
  } else { 
    const cookie = request.cookies.auth_key;
    const userId = await redisClient.get(`auth_${cookie}`);
    const { videoName } = request.body;
    const { description } = request.body;
    const { category } = request.body;
    const { videoLink } = request.body;
    const uploadDate = new Date().toJSON();
    const items = await getId(videoLink);
    const regex = new RegExp("https:\/\/youtu.be\/.*");

    if ((!regex.test(videoLink)) || (!items)) {
      response.status(404).send({ message: 'Video URL is incorrect' });
    } else {
      const videoObj = await getVideoObj(videoLink);
      const videoThumbnail = items.snippet.thumbnails.high.url;
      const vidId = items.id.videoId;
      const embedVideo = `https://www.youtube.com/embed/${vidId}`;
      let videoStats = {};
      try {
        videoStats = videoObj.items[0].statistics;
        delete videoStats.favoriteCount;
        videoStats.commentCount = '0';
      } catch (err) {
        videoStats = {
          viewCount: '0',
          likeCount: '0',
          commentCount: '0'
        };
      }
      const user = await dbClient.get('users', { _id: ObjectId(userId) });
      const userName = user.username;
      const video = new Video(videoName, userId, uploadDate, description, category, embedVideo, videoStats, userName, videoThumbnail);
      const vid = await dbClient.postVideo('videos', video);
      if (vid !== 'Video Exists') {
        await dbClient.client.db('producktiv').collection('users').updateOne({ _id: ObjectId(userId) }, { $push: { videos: vid[0] } });
        const categoryName = await dbClient.get('categories', { name: category });
        if (!categoryName) {
          const categ = new Category(category);
          await dbClient.client.db('producktiv').collection('categories').insertOne(categ);
          await dbClient.client.db('producktiv').collection('categories').updateOne({ name: category }, { $push: { videos: vid[0] } });
          response.status(201).send({ message: 'Uploaded video' });
        } else {
          await dbClient.client.db('producktiv').collection('categories').updateOne({ name: category }, { $push: { videos: vid[0] } });
          response.status(201).send({ message: 'Uploaded video' });
        }
      } else {
        response.status(300).send({ message: 'Video Exists' });
      }
    }
  }
};

// Get all videos posted by a user
exports.getAllVideos = async (request, response) => {
  const validateRequest = await Auth.sessionAuth(request, response);
  if (!validateRequest) {
    response.status(401).send({ message: 'Cookie Expired' });
  } else {
    const values = await redisClient.get('videos');
    if (values) {
      const videos = JSON.parse(values);
      response.status(200).send({ videos }); 
    } else {
      const videos = await dbClient.getVideos('videos');
      if (videos) {
        await redisClient.setCategory('videos', JSON.stringify(videos));
        response.status(200).send({ videos });
      } else {
        response.status(404).send({ error: 'No Video Doesn\'t exists' });
      }
    }
  }
};

// This callback function will get all video from database
exports.getVideo = async (request, response) => {
  const validateRequest = await Auth.sessionAuth(request, response);
  if (!validateRequest) {
    response.status(401).send({ message: 'Cookie Expired' });
  } else {
    const { id } = request.params;
    const video = await dbClient.get('videos', { _id: ObjectId(id) });
    if (video) {
      const vid = uuid();
      const key = `vid_${vid}`;
      await redisClient.set(key, id.toString());
      response.status(200).send({ video });
    } else {
      response.status(404).send({ error: 'Video Doesn\'t exists' });
    }
  } 
};

// This callback function will delete a video from database
// and from the list of videos of a user
exports.deleteVideo = async (request, response) => {
  const validateRequest = await Auth.sessionAuth(request, response);
  if (!validateRequest) {
    response.status(401).send({ message: 'Cookie Expired' });
  } else {
    const { id } = request.params;
    const cookie = request.cookies.auth_key;
    const userId = await redisClient.get(`auth_${cookie}`);
    const user = await dbClient.get('users', { _id: ObjectId(userId) });
    for (const vid of user.videos) {
      if (vid._id === id) {
        await dbClient.client.db('producktiv').collection('users').updateOne({ _id: ObjectId(userId) }, { $pull: { videos: vid } });
        await dbClient.client.db('producktiv').collection('categories').updateOne({ name: vid.category }, { $pull: { videos: vid } });
      }
    }
    const video = await dbClient.del('videos', { _id: ObjectId(id) });
    if (video === 'Deleted') {
      response.status(200).send({ message: 'Video Deleted' });
    } else {
      response.status(404).send({ error: 'Video Doesn\'t exists' });
    }
  }
};
