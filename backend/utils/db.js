// Mongo database controller

const { MongoClient } = require('mongodb');
const Category = require('../dataObjects/categoryObject');

class DBClient {
  // This function will connect to mongodb
  constructor () {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'producktiv';
    //const uri = `mongodb://${host}:${port}`;
    //const uri = `mongodb+srv://producktiv:producktiv@productiv.qmorhmh.mongodb.net/?retryWrites=true&w=majority`
    const uri = process.env.MONGOURL;
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    (
      async () => {
        console.log('Connecting to Mongo database');
        await client.connect();
        this.setupDB(['Art', 'Business', 'Lifestyle', 'Programming']);
      }
    )();
    this.client = client;
    this.database = database;
  }

  async setupDB (categories) {
    categories.forEach(async (category) => {
      const categoryExist = await this.get('categories', { name: category });
      if (!categoryExist) {
        const categ = new Category(category);
        await this.client.db('producktiv').collection('categories').insertOne(categ);
    }
    });
  }

  // This function will add documents to a collection
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

  // This function will add videos to a collection
  async postVideo (collectionName, object) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const videoExists = await this.get('videos', { embedVideo: object.embedVideo });
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

  // This function will add category to a collection
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

  // This function will get a document from a colletion
  async get (collectionName, filterObj) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const documentArray = await collection.find(filterObj).toArray();
    if (documentArray.length > 0) {
      return documentArray[0];
    }
    return false;
  }

  // This function will delete a user from a collection when user logs out
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

  // This function will get all users from a collection 20 at a time
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
