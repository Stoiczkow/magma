import amqplib from 'amqplib';

import config from './config';

export const connectToRabbitMQ = async (onMessage: (msg: string) => void) => {
    try {
        const connection = await amqplib.connect(config.rabbitUrl);
        const channel = await connection.createChannel();

        for (const queue of Object.values(config.rabbitQueues)) {
            await channel.assertQueue(queue, { durable: true });

            console.log(`Connected to RabbitMQ, waiting for messages in "${queue}"`);
            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const content = msg.content.toString();

                    // send notification to user here
                    if (queue === config.rabbitQueues.userCreated) {
                        console.log(`Welcome to the service`)
                    } else {
                        console.log(`Sending notification to user from queue ${queue}`);
                    }

                    onMessage(content);
                    channel.ack(msg);
                }
            });
        }

    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
}