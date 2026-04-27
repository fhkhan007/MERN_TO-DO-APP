// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";
const url ="mongodb+srv://webanilsidhu:12345@cluster0.dqwwk5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName="node-project";
export const collectionName="todo";
const client= new MongoClient(url)
export const connection=async ()=>{

    const connect = await client.connect();
    return await connect.db(dbName)
}