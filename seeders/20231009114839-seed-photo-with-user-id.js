'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos",[
      {
        title: "Photo 1.1",
        caption: "Caption photo 1",
        imager_url: "https://picsum.photos/id/1/200/300",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        title: "Photo 2.1",
        caption: "Caption photo 2",
        imager_url: "https://picsum.photos/id/2/200/300",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      },
      {
        title: "Photo 2.1",
        caption: "Caption photo 2",
        imager_url: "https://picsum.photos/id/2/200/300",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Photos", null, {})
  }
};
