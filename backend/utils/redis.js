// This script will  create a redis client for session

import { createClient } from 'redis';

const util = require('util');

class RedisClient {
  // Constructor will create a redis client and connect to redis server
  // If error occurs while connecting to server it will log error message to console
  constructor () {
    this.client = createClient();
    this.client.on('connect', () => {});
    this.client.on('error', (err) => {
      console.log(err);
    });
  }

  // This function will set key to value in redis and that key will only be used for 24 hrs
  async set (key, value) {
    await this.client.set(key, value);
    await this.client.expire(key, 60 * 60 * 24);
  }

  // This function will set key to a list of videos in redis and that key will only be used for 12 hours
  // It will then refresh and add more videos if they exist or remove if they don't exist
  async setCategory (key, value) {
    await this.client.set(key, value);
    await this.client.expire(key, 60 * 60 * 12);
  }

  // This function will get key from redis and returns a value
  async get (key) {
    const getSet = util.promisify(this.client.get).bind(this.client);
    try {
      const value = await getSet(key);
      return value;
    } catch (error) {
      console.log(error);
    }
  }

  // This function will delete a key before time if user is logging out
  async del (key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
