import { ObjectId } from 'mongodb';

import db from '../config/dbClient';
import { UserFilter, UserUpdate, UserCreate } from '../types/user';
import { sendMessageToRabbit } from '../config/rabbit';
import config from '../config/config';

export const findAllUsers = async () => {
    return db.users.find({}).toArray();
}

export const saveUser = async (data: UserCreate) => {
    const user = await db.users.insertOne({ ...data, ...{ createdAt: new Date().toISOString() } });

    // sending msg to rabbit
    if (user.insertedId) {
        sendMessageToRabbit(JSON.stringify(user), config.rabbitQueues.userCreated);
    }

    return user;
}

export const findUser = async (filter: UserFilter) => {
    const user = await db.users.findOne(filter);
    return user;
}

export const patchUser = async (id: ObjectId, data: UserUpdate) => {
    const updatedUser = await db.users.updateOne({ _id: id }, { $set: data });
    return updatedUser;
}

export const deleteUser = async (id: ObjectId) => {
    const user = await db.users.deleteOne({ _id: id });
    if (user.deletedCount === 1) {
        sendMessageToRabbit(JSON.stringify(user), config.rabbitQueues.userDeleted);
    }

    return user;
}