import { Router } from 'express';
import { getAllUsers, createUser, getUserById, updateUser, removeUser } from '../controllers/userController';
import { createValidations, updateValidations } from '../validators/userValidation';
import { validate } from '../services/common'
const router = Router();

router.get('/', getAllUsers);
router.post('/', validate(createValidations), createUser);
router.get('/:id', getUserById);
router.patch('/:id', validate(updateValidations), updateUser);
router.delete('/:id', removeUser);

export default router;