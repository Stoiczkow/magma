import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { ObjectId } from 'mongodb';

import { saveUser, findUser, patchUser, deleteUser, findAllUsers } from '../services/userServices';
import { STATUS_CODES } from '../config/consts';
import { sendMessageToRabbit } from '../config/rabbit';
import config from '../config/config';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await findAllUsers()
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await findUser({ email: req.body.email })

        if (user) {
            throw createHttpError(STATUS_CODES.BAD_REQUEST, 'Email exists')
        }
        const createdUser = await saveUser(req.body)

        // sending msg to rabbit
        if (createdUser.insertedId) {
            sendMessageToRabbit(JSON.stringify(createdUser), config.rabbitQueues.userCreated);
        }
        res.status(STATUS_CODES.CREATED).json(createdUser);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await findUser({ _id: new ObjectId(req.params?.id) })
        if (!user) {
            throw createHttpError(STATUS_CODES.NOT_FOUND, 'Not found')
        }
        res.status(STATUS_CODES.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        if (data.email) {
            const user = await findUser({ email: data.email })

            if (user) {
                throw createHttpError(STATUS_CODES.BAD_REQUEST, 'Email exists')
            }
        }
        const updatedUser = await patchUser(new ObjectId(req.params?.id), req.body)
        res.status(STATUS_CODES.OK).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedUser = await deleteUser(new ObjectId(req.params?.id))

        if (deletedUser.deletedCount === 1) {
            sendMessageToRabbit(JSON.stringify(deletedUser), config.rabbitQueues.userDeleted);
        }
        res.status(STATUS_CODES.OK).json(deletedUser);
    } catch (error) {
        next(error);
    }
};