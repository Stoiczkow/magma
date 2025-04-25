import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    dbUrl: string
    dbName: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    //dbUrl: "mongodb+srv://root:example@127.0.0.1:8082?writeConcern=majority",
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'test',
};

export default config;