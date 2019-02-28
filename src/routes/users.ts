import { Router } from 'express';
import * as controllers from '../controllers/users';

const router = Router();

router.use(controllers.userRepositorySetMiddleware);
router.get('/', controllers.usersListAction);
router.post('/', controllers.userCreateAction);
router.get('/:id', controllers.userSetMiddleware, controllers.userGetAction);
router.put('/:id', controllers.userSetMiddleware, controllers.userUpdateAction);
router.patch(
  '/:id',
  controllers.userSetMiddleware,
  controllers.userUpdateAction
);
router.delete(
  '/:id',
  controllers.userSetMiddleware,
  controllers.userDeleteAction
);

export default router;
