const {MongoClient, ObjectId} = require('mongodb');
const database = "crawler";
const collection = "console";

class Database {
	constructor(url = process.env.GTA_CONNECTION_STRING) {
		this.client = new MongoClient(url);
		this.connect().then(() => console.log("Connected successfully."));
	}

	async connect() {
		await this.client.connect();
		const db = this.client.db(database);
		this.collection = db.collection(collection);
	}

	async close() {
		await this.client.close();
		console.log("Connection closed.");
	}

	async find(console, title) {
		return this.collection.find({console: console, title: {'$regex' : title, '$options' : 'i'}}).toArray();
	}

	async findById(id) {
		return this.collection.find({_id: new ObjectId(id)}).toArray();
	}
}

module.exports = Database;