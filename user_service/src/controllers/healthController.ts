import { Request, Response, NextFunction } from 'express';


export const healthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ "status": "ok" });
    } catch (error) {
        next(error);
    }
};