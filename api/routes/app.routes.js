import { Router } from 'express';
import controller from '../controller/app.controller.js';

const router = new Router();

router.post('/users', controller.createUser);
router.get('/users', controller.getUsers);
router.get('/users/:id', controller.getOneUser);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

export default router;
