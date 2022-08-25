// Mongo database controller

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'producktiv';
    const uri = `mongodb://${host}:${port}`;
    const client = new MongoClient(uri);
    client.connect();
    this.client = client;
    this.database = database;
  }

  async post(collectionName, document) {
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

  async get(collectionName, filterObj) {
    const db = this.client.db(this.database);
    const collection = db.collection(collectionName);
    const documentArray = await collection.find(filterObj).toArray();
    if (documentArray.length > 0) {
      return documentArray[0];
    }
    return false;
  }
}

module.exports = new DBClient();
