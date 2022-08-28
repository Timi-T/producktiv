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
      await collection.deleteOne(documentArray[0]);
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
}

module.exports = new DBClient();
