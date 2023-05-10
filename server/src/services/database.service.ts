// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";



// Global Variables
const username = encodeURIComponent("alewilliam789");
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = "cluster0.uf3j3h7.mongodb.net";
const authSource = "retryWrites=true";
const authMechanism = "w=majority";
let uri =
  `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;

export const collections : {notes?: mongoDB.Collection, users?: mongoDB.Collection} = {};


export async function connectToDatabase(){
    dotenv.config();
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri);
    
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const notesCollection: mongoDB.Collection = db.collection(process.env.NOTES_COLLECTION_NAME);

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME);

    collections.notes = notesCollection;
    collections.users = usersCollection;

        console.log(`Successfully connected to database: ${db.databaseName} and collections: ${notesCollection.collectionName} & ${usersCollection.collectionName}`)

}