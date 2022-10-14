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
     await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId:1,
        url: "WestminsterImage.com"
      },
      {
        reviewId:2,
        url: "IrvineImage.com"
      },{
        reviewId:3,
        url: "GroveImage.com"
      },
      {
        reviewId:4,
        url: "LosImage.com"
      },
      {
        reviewId:5,
        url: "RiversideImage.com"
      },
      {
        reviewId:6,
        url: "MontereyImage.com"
      },
      {
        reviewId:7,
        url: "SacramentoImage.com"
      }
     ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('ReviewImages',{
       reviewId:{[Op.in] : [1,2,3,4,5,6,7]}
     },{});
  }
};
