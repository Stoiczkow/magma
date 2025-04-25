import { ObjectId } from 'mongodb';

import db from '../config/dbClient';
import { UserFilter, UserUpdate, UserCreate } from '../types/user';

export const findAllUsers = async () => {
    return await db.users.find({}).toArray();
}

export const saveUser = async (data: UserCreate) => {
    return db.users.insertOne({ ...data, ...{ createdAt: new Date().toISOString() } });
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
    return user;
}