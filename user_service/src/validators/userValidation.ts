import { check, checkExact } from "express-validator";

export const createValidations =
    checkExact([
        check('name').exists().notEmpty().isString(),
        check('email').exists().notEmpty().isString().isEmail(),
        check('_id').not().exists(),
        check('created_at').not().exists()],
        { locations: ['body'] })



export const updateValidations =
    checkExact([
        check('name').optional().notEmpty().isString(),
        check('email').optional().notEmpty().isString().isEmail(),
        check('_id').not().exists(),
        check('created_at').not().exists(),],
        { locations: ['body'] })
