import { MongoClient } from "mongodb";

import config from "./config";
import { MODELS } from "./consts";

const client = new MongoClient(`mongodb://${config.dbUser}:${config.dbPass}@${config.dbUrl}`);

client.connect();

const db = client.db(config.dbName);

export default Object.fromEntries(MODELS.map((model) => [model, db.collection(model)]));
