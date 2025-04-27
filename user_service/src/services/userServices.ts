import { ObjectId } from 'mongodb';

import db from '../config/dbClient';
import { UserFilter, UserUpdate, UserCreate } from '../types/user';

export const findAllUsers = async () => {
    return db.users.find({}).toArray();
}

export const saveUser = async (data: UserCreate) => {
    return db.users.insertOne({ ...data, ...{ createdAt: new Date().toISOString() } });;
}

export const findUser = async (filter: UserFilter) => {
    return db.users.findOne(filter);;
}

export const patchUser = async (id: ObjectId, data: UserUpdate) => {
    return db.users.updateOne({ _id: id }, { $set: data });;
}

export const deleteUser = async (id: ObjectId) => {
    return db.users.deleteOne({ _id: id });;
}