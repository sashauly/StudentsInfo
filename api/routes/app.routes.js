import { Router } from 'express';
import controller from '../controller/app.controller.js';

const router = new Router();

router.post('/user', controller.createUser);
router.get('/user', controller.getUsers);
router.get('/user/:id', controller.getOneUser);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.deleteUser);

export default router;
