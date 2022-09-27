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
   await queryInterface.bulkInsert('SpotImages',[
    {
      spotId:1,
      url: "Westminster.com",
      preview:true
    },
    {
      spotId:2,
      url: "Irvine.com",
      preview:true
    },{
      spotId:3,
      url: "Grove.com",
      preview:true
    },
    {
      spotId:4,
      url: "Los.com",
      preview:true
    },
    {
      spotId:5,
      url: "Riverside.com",
      preview:true
    },
    {
      spotId:6,
      url: "Monterey.com",
      preview:true
    },
    {
      spotId:7,
      url: "Sacramento.com",
      preview:true
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
    await queryInterface.bulkDelete('SpotImages',{
      spotId:{[Op.in] : [1,2,3,4,5,6,7]}
    },{});
  }
};
