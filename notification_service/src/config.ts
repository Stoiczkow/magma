import dotenv from 'dotenv';

dotenv.config();

type RabbitQueues = {
    userCreated: string,
    userDeleted: string
}

interface Config {
    rabbitUrl: string;
    rabbitQueues: RabbitQueues;
}

const config: Config = {
    rabbitUrl: process.env.RABBITMQ_URL || 'amqp://localhost',
    rabbitQueues: JSON.parse(process.env.QUEUES ? process.env.QUEUES : '{}'),
};

export default config;