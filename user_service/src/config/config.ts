import dotenv from 'dotenv';

dotenv.config();

type RabbitQueues = {
    userCreated: string,
    userDeleted: string
}

interface Config {
    port: number;
    nodeEnv: string;
    dbUrl: string;
    dbName: string;
    rabbitUrl: string;
    rabbitQueues: RabbitQueues;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME || 'test',
    rabbitUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    rabbitQueues: JSON.parse(process.env.QUEUES ? process.env.QUEUES : '{}'),
};

export default config;
