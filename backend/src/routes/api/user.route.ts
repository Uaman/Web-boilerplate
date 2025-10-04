import { Router } from 'express';
import * as userController from '../../controllers/user.controller';

const router: Router = Router();

router.get('/all', userController.getUsers);

router.post('/new', userController.postUser);

router.post('/fill', userController.fillUsers);

router.put('/favorite', userController.makeFavorite);

export default router;
