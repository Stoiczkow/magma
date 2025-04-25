import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import { saveUser, findUser, patchUser, deleteUser, findAllUsers } from '../services/userServices';
import { STATUS_CODES } from '../config/consts';
import { ObjectId } from 'mongodb';

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
        const createdUsers = await saveUser(req.body)

        // send message to broker here
        res.status(STATUS_CODES.CREATED).json(createdUsers);
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
        const user = await deleteUser(new ObjectId(req.params?.id))

        // send message to broker here
        res.status(STATUS_CODES.OK).json(user);
    } catch (error) {
        next(error);
    }
};