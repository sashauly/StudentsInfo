import { Router } from 'express';
import controller from '../controller/app.controller.js';
import cache from './cache.routes.js';

const router = new Router();

router.post('/user', cache(300), controller.createUser);
router.get('/user', cache(300), controller.getUsers);
router.get('/user/:id', cache(300), controller.getOneUser);
router.put('/user/:id', cache(300), controller.updateUser);
router.delete('/user/:id', cache(300), controller.deleteUser);

export default router;
