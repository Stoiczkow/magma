import { ObjectId } from "mongodb";

type UserFilter = {
    _id?: ObjectId;
    name?: string;
    email?: string;
}

type UserUpdate = {
    email?: string;
    name?: string
}

type UserCreate = {
    email: string;
    name: string
}

export { UserFilter, UserUpdate, UserCreate };