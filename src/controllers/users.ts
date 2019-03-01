import { Request, Response, NextFunction } from 'express';
import * as usersManager from '../managers/users';

export async function userSetMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id) {
    return next();
  }

  const user = await usersManager.getUser(id);

  if (!user) {
    return res.sendStatus(404);
  }

  req.app.locals.user = user;

  next();
}

export async function usersListAction(req: Request, res: Response) {
  return res.json(await usersManager.getUsersList());
}

export async function userCreateAction(req: Request, res: Response) {
  return res.json(await usersManager.createUser(req.body));
}

export async function userGetAction(req: Request, res: Response) {
  const { user } = req.app.locals;
  return res.json(user);
}

export async function userUpdateAction(req: Request, res: Response) {
  const { user } = req.app.locals;
  return res.json(await usersManager.updateUser(user, req.body));
}

export async function userDeleteAction(req: Request, res: Response) {
  const { user } = req.app.locals;
  await usersManager.deleteUser(user);
  return res.sendStatus(204);
}
