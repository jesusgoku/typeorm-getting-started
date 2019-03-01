import * as usersManager from '../managers/users';

import User from '../entity/User';

const resolvers = {
  Query: {
    users: async () => {
      return await usersManager.getUsersList();
    },

    user: async (_, { id }) => {
      return await usersManager.getUser(id);
    },
  },

  Mutation: {
    userAdd: async (_, { firstName, lastName, email }) => {
      return await usersManager.createUser({ firstName, lastName, email });
    },

    userUpdate: async (_, { id, firstName, lastName, email }) => {
      const user = await usersManager.getUser(id);

      if (!user) {
        return user;
      }

      return await usersManager.updateUser(user, {
        firstName,
        lastName,
        email,
      });
    },

    userDelete: async (_, { id }) => {
      const user = await usersManager.getUser(id);

      if (!user) {
        return user;
      }

      await usersManager.deleteUser(user);
      return user;
    },
  },
};

export default resolvers;
