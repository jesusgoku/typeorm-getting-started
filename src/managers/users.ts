import { getConnection } from 'typeorm';
import User from '../entity/User';

export async function getUserRepository() {
  return (await getConnection()).getRepository(User);
}

export async function getUsersList(): Promise<User[]> {
  return (await getUserRepository()).find();
}

export async function createUser(data): Promise<User> {
  const userRepository = await getUserRepository();
  const user = userRepository.create(data as User);
  await userRepository.save(user);
  return await userRepository.findOne(user.id);
}

export async function getUser(id: number): Promise<User> {
  return (await getUserRepository()).findOne(id);
}

export async function updateUserById(id: number, data): Promise<User> {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne(id);
  await userRepository.save(userRepository.merge(user, data));
  return user;
}

export async function updateUser(user: User, newUserData): Promise<User> {
  const userRepository = await getUserRepository();
  return await userRepository.save(userRepository.merge(user, newUserData));
}

export async function deleteUserById(id: number) {
  const userRepository = await getUserRepository();
  const user = await userRepository.findOne(id);
  return await userRepository.delete(user);
}

export async function deleteUser(user: User) {
  return await (await getUserRepository()).delete(user);
}
