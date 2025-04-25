import { validationResult, ValidationError, Result, ContextRunner } from "express-validator";
import { Request, Response, NextFunction } from 'express';
import { Middleware } from "express-validator/lib/base";
type parsed = [{
    param?: string;
    message?: string;
}]

const parseErrors = (errors: Result<ValidationError>) => {
    const parsed = [];
    // console.log(errors.errors)
    // for (const e of errors.errors) {
    //     parsed.push({

    //         message: e.msg,
    //     })
    //     //     if (parsed[e.param]) continue;
    //     //     parsed[e.param] = {
    //     //         param: e.param,
    //     //         message: e.msg,
    //     //     };
    //     // }

    //     return Object.values(parsed);
    // };
}

export const validate = (validations: Middleware & ContextRunner) => async (req: Request, res: Response, next: NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    res.status(400).json({ validationErrors: errors });
};