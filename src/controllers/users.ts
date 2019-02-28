import { Request, Response, NextFunction } from 'express';
import { getConnection } from 'typeorm';
import User from '../entity/User';

async function getUserRepository() {
  return (await getConnection()).getRepository(User);
}

export async function userRepositorySetMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.app.locals.userRepository = await getUserRepository();
  next();
}

export async function userSetMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!id) {
    return next();
  }

  const user = await (await getUserRepository()).findOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  req.app.locals.user = user;

  next();
}

export async function usersListAction(req: Request, res: Response) {
  const { userRepository } = req.app.locals;
  const users = await userRepository.find();

  return res.json(users);
}

export async function userCreateAction(req: Request, res: Response) {
  const { userRepository } = req.app.locals;
  const user = userRepository.create(req.body);
  await userRepository.save(user);
  return res.json(user);
}

export async function userGetAction(req: Request, res: Response) {
  const { user } = req.app.locals;
  return res.json(user);
}

export async function userUpdateAction(req: Request, res: Response) {
  const { userRepository, user } = req.app.locals;

  await userRepository.save(userRepository.merge(user, req.body));

  return res.json(user);
}

export async function userDeleteAction(req: Request, res: Response) {
  const { userRepository, user } = req.app.locals;

  await userRepository.remove(user);
  return res.sendStatus(204);
}
