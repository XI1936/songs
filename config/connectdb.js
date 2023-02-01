const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDb = async ()=>{
    const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    return client.connect();
};

module.exports = connectDb;