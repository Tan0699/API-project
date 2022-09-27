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
     await queryInterface.bulkInsert('Spots', [
      {
        ownerId:1,
        address:"12345 Blue Street",
        city:"Westminster",
        state:"California",
        country:"USA",
        lat:11.1,
        lng:11.2,
        name:"West",
        description:"Good food bad drivers",
        price:349.99
      },
      {
        ownerId:2,
        address:"12345 Green Street",
        city:"Irvine",
        state:"California",
        country:"USA",
        lat:10.1,
        lng:10.2,
        name:"Anteater",
        description:"Good food too pricey",
        price:449.99
      },
      {
        ownerId:3,
        address:"12345 Purple Street",
        city:"Garden Grove",
        state:"California",
        country:"USA",
        lat:12.1,
        lng:12.2,
        name:"GG",
        description:"Lot of Boba",
        price:399.99
      },
      {
        ownerId:4,
        address:"12345 Teal Street",
        city:"Los Angelos",
        state:"California",
        country:"USA",
        lat:13.1,
        lng:13.2,
        name:"LA",
        description:"Super spooky roads",
        price:299.99
      },
      {
        ownerId:5,
        address:"12345 Yellow Street",
        city:"Riverside",
        state:"California",
        country:"USA",
        lat:14.1,
        lng:14.2,
        name:"Desert",
        description:"Theres nothing up here",
        price:199.99
      },
    {
        ownerId:6,
        address:"12345 Pink Street",
        city:"Monterey",
        state:"California",
        country:"USA",
        lat:15.1,
        lng:15.2,
        name:"Monty",
        description:"Best clam chowder ever",
        price:549.99
      },
      {
        ownerId:7,
        address:"12345 Red Street",
        city:"Sacramento",
        state:"California",
        country:"USA",
        lat:16.1,
        lng:16.2,
        name:"Sf",
        description:"Dont keep things in your car",
        price:699.99
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
    await queryInterface.bulkDelete('Spots',{
      ownerId:{[Op.in] : [1,2,3,4,5,6,7]}
    },{});
  }
};
