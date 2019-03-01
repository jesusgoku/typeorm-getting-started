import { getConnection } from 'typeorm';

import User from '../entity/User';

const resolvers = {
  Query: {
    users: async () => {
      const connection = await getConnection();
      const userRepository = connection.getRepository(User);
      return await userRepository.find();
    },

    user: async (_, { id }) => {
      const connection = await getConnection();
      const userRepository = connection.getRepository(User);
      return await userRepository.findOne(id);
    },
  },

  Mutation: {
    userAdd: async (_, { firstName, lastName, email }) => {
      const connection = await getConnection();
      const userRepository = connection.getRepository(User);
      const user = userRepository.create({ firstName, lastName, email });
      await userRepository.save(user);
      return await userRepository.findOne(user.id);
    },

    userUpdate: async (_, { id, firstName, lastName, email }) => {
      const connection = await getConnection();
      const userRepository = connection.getRepository(User);
      const user = await userRepository.findOne(id);

      if (!user) {
        return user;
      }

      userRepository.merge(user, { firstName, lastName, email });
      return await userRepository.save(user);
    },

    userDelete: async (_, { id }) => {
      const connection = await getConnection();
      const userRepository = connection.getRepository(User);
      const user = await userRepository.findOne(id);

      if (!user) {
        return user;
      }

      await userRepository.delete(user);
      return user;
    },
  },
};

export default resolvers;
