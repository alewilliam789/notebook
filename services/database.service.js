// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
dotenv.config();
const username = encodeURIComponent("alewilliam789");
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = "cluster0.uf3j3h7.mongodb.net";
let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
export const collections = {};
export async function connectToDatabase() {
    const client = new mongoDB.MongoClient(uri);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const notesCollection = db.collection(process.env.NOTES_COLLECTION_NAME);
    const usersCollection = db.collection(process.env.USERS_COLLECTION_NAME);
    collections.notes = notesCollection;
    collections.users = usersCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collections: ${notesCollection.collectionName} & ${usersCollection.collectionName}`);
}
//# sourceMappingURL=database.service.js.map