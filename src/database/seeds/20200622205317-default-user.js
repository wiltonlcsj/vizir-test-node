const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const password = await bcrypt.hash('123456', 8);

    return queryInterface.bulkInsert('users', [{
      name: 'Test User',
      email: 'emailtest@testmail.com',
      password_hash: password,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
