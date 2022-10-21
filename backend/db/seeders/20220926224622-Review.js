'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Reviews', [
      {
        spotId:2,
        userId:1,
        review:"poggers",
        stars:5
      },
      {
        spotId:3,
        userId:2,
        review:"pogchamp",
        stars:4
      },
      {
        spotId:4,
        userId:3,
        review:"pepega",
        stars:3
      },
      {
        spotId:5,
        userId:4,
        review:"monkaS",
        stars:2
      },
      {
        spotId:6,
        userId:5,
        review:"yummy",
        stars:4
      },
      {
        spotId:7,
        userId:6,
        review:"yikes",
        stars:1
      },
      {
        spotId:1,
        userId:7,
        review:"someone took my suitcase",
        stars:1
      },
      {
        spotId:1,
        userId:2,
        review:"woggers",
        stars:5
      },
      {
        spotId:1,
        userId:3,
        review:"madgers",
        stars:5
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('Reviews',{
       spotId:{[Op.in] : [1,2,3,4,5,6,7]}
     },{});
  }
};
