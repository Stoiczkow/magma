import amqplib from 'amqplib';

import config from './config';

let channel: amqplib.Channel;

const connectToRabbit = async () => {
    try {
        const connection = await amqplib.connect(config.rabbitUrl,);
        channel = await connection.createChannel();

        for (const queue of Object.values(config.rabbitQueues)) {
            channel.assertQueue(queue, { durable: true });
        };
    } catch (error) {
        console.error('Failed to connect to Rabbit', error);
        if (!channel) {
            setTimeout(async () => {
                console.log('Reconnecting to rabbit ...');
                await connectToRabbit();
            }, 5000);
        }

    }
}

connectToRabbit()

export const sendMessageToRabbit = (message: string, queue: string) => {
    if (channel) {
        try {
            channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

            console.log(`Sent: ${message}`);

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }

}

