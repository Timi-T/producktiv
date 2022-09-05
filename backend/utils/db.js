// Mongo database controller

const { MongoClient } = require('mongodb');

class DBClient {
   constructor () {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'producktiv';
    const uri = `mongodb://${host}:${port}`;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    client.connect();
    this.client = client;
    this.database = database;
  } 

  async post (collectionName, document) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const userExists = await this.get('users', { email: document.email });
    if (!userExists) {
      const savedUser = await collection.insertOne(document);
      if (savedUser.ops.length > 0) {
        return 'Saved';
      }
      return false;
    }
    return 'User exists';
  }

  // This function will add videos to database
  async postVideo (collectionName, object) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const videoExists = await this.get('videos', { videoLink: object.embedVideo });
    if (!videoExists) {
      const savedVideo = await collection.insertOne(object);
      if (savedVideo.ops.length > 0) {
        return savedVideo.ops;
      } else {
        return 'false';
      }
    } else {
      return 'Video Exists';
    }
  }

  // This function will add category to database
  async postCategory (collectionName, object) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const categoryExists = await this.get('categories', { name: object.name });
    if (!categoryExists) {
      const savedCategory = await collection.insertOne(object);
      if (savedCategory.ops.length > 0) {
        return 'Saved';
      } else {
        return 'false';
      }
    } else {
      return 'Category Exists';
    }
  }

  async get (collectionName, filterObj) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const documentArray = await collection.find(filterObj).toArray();
    if (documentArray.length > 0) {
      return documentArray[0];
    }
    return false;
  }

  // This function will delete a user from databse when user logs out
  async del (collectionName, filterObj) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const documentArray = await collection.find(filterObj).toArray();
    if (documentArray.length > 0) {
      await collection.deleteOne(filterObj);
      return 'Deleted';
    }
    return false;
  }

  // This function will get all users from database 20 at a time
  async getAll (collectionName, page) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const users = await collection.find().sort({ username: 1 }).collation({ locale: 'en', caseLevel: true }).skip(20 * page).limit(20).toArray();
    return users;
  }

  // This function will get all vidoes at once for deletion
  async getVideos (collectionName) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const videos = await collection.find().toArray();
    if (videos.length > 0) {
      return videos;
    }
    return false;
  }

  // This function will get all vidoes at once for deletion from categories
  async getCategs (collectionName, categName) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const categs = await collection.find(categName).toArray();
    if (categs.length > 0) {
      return categs;
    }
    return false;
  }
}

module.exports = new DBClient();
