import { Router } from 'express';
import controller from '../controller/app.controller.js';
import cache from './cache.routes.js';

const router = new Router();

router.post('/user', controller.createUser);
router.get('/user', cache(300), controller.getUsers);
router.get('/user/:id', cache(300), controller.getOneUser);
router.put('/user/:id', controller.updateUser);
router.delete('/user/:id', controller.deleteUser);

export default router;
