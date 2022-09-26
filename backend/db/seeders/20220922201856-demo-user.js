'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'Btian@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: "Brian",
        lastName:"Tran"
      },
      {
        email: 'Steven@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: "Steven",
        lastName:"Bao"
      },
      {
        email: 'Kent@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: "Kent",
        lastName:"Dinh"
      },
      {
        email: 'Break@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: "Break",
        lastName:"Bot"
      },
      {
        email: 'Emily@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: "Emily",
        lastName:"Van"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};