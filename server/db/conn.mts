import * as mongoDB from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client : mongoDB.MongoClient  = new mongoDB.MongoClient(connectionString);



try {
    await client.connect();
}
catch(e) {
    console.error(e);
}

let db = client.db("notebook")

export default db;