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
      {
        email: 'Vanessa@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: "Vanessa",
        lastName:"Mao"
      },
      {
        email: 'Yuki@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: "Yuki",
        lastName:"Doggo"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2','FakeUser3','FakeUser4',"FakeUser5",'FakeUser6'] }
    }, {});
  }
};