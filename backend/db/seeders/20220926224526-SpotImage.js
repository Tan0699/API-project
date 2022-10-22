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
      url: "https://a0.muscache.com/im/pictures/34d21a76-15e0-4132-adeb-e0869cfa55d3.jpg?im_w=1200",
      preview:true
    },
    {
      spotId:2,
      url: "https://i.ibb.co/grw0SMB/istockphoto-146052140-170667a.jpg",
      preview:true
    },{
      spotId:3,
      url: "https://i.ibb.co/ysmCGhk/fb62bda433d08318849d3511b4833820d585698d-2-690x408.jpg",
      preview:true
    },
    {
      spotId:4,
      url: "https://i.ibb.co/r0DyjXx/2849499260-7facb3a6e9-b.jpg",
      preview:true
    },
    {
      spotId:5,
      url: "https://i.ibb.co/xXLw2Zk/maxresdefault.jpg",
      preview:true
    },
    {
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44245129/original/f34c88dd-d7ca-4fd9-b87d-00b8f038b27e.jpeg?im_w=1200",
      preview:true
    },
    {
      spotId:7,
      url: "https://a0.muscache.com/im/pictures/ff86da2c-30ca-4ab9-b13b-f213c6322793.jpg?im_w=720",
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
