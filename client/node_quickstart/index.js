const { MongoClient } = require('mongodb');

// Replace this with your actual connection string
const url = 'mongodb://localhost:27017'; // For a local MongoDB instance
// or
// const url = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/myDatabase'; // For MongoDB Atlas

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await client.connect();
        console.log('Connected to database');
        const database = client.db('yourDatabaseName');
        const movies = database.collection('movies');
        // Your code here
    } finally {
        await client.close();
    }
}

main().catch(console.error);
require('dotenv').config();
const url = process.env.mongodb://localhost:27017;