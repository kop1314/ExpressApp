'use strict';
const SEC_TO_MILLISEC = 1000;
const DAY_TO_MILLISEC = 24 * 60 * 60 * SEC_TO_MILLISEC;
const WEEK_TO_MILLISEC = 7 * DAY_TO_MILLISEC;
const MONTH_TO_MILLISEC = 30.4167 * DAY_TO_MILLISEC;
const YEAR_TO_MILLISEC = 365 * DAY_TO_MILLISEC;

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
    return await queryInterface.bulkInsert('Posts', [
      
      {
        title: "demo post 1yr ago",
        description: "it is a demo post.",
        userId: 2,
        createdAt: new Date(Date.now() - YEAR_TO_MILLISEC).toISOString(),
        updatedAt: new Date(Date.now() - YEAR_TO_MILLISEC).toISOString()
      },
      {
        title: "demo post 8m ago",
        description: "it is a demo post.",
        userId: 2,
        createdAt: new Date(Date.now() - 8 * MONTH_TO_MILLISEC).toISOString(),
        updatedAt: new Date(Date.now() - 8 * MONTH_TO_MILLISEC).toISOString()
      },
      {
        title: "demo post 4w ago",
        description: "it is a demo post.",
        userId: 2,
        createdAt: new Date(Date.now() - 4 * WEEK_TO_MILLISEC).toISOString(),
        updatedAt: new Date(Date.now() - 4 * WEEK_TO_MILLISEC).toISOString()
      },
      
      {
        title: "demo post 10d ago",
        description: "it is a demo post.",
        userId: 2,
        createdAt: new Date(Date.now() - 10 * DAY_TO_MILLISEC).toISOString(),
        updatedAt: new Date(Date.now() - 10 * DAY_TO_MILLISEC).toISOString()
      },

      {
        title: "demo post 2s ago",
        description: "it is a demo post.",
        userId: 2,
        createdAt: new Date(Date.now() - 2 * SEC_TO_MILLISEC).toISOString(),
        updatedAt: new Date(Date.now() - 2 * SEC_TO_MILLISEC).toISOString()
      }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Posts', {
      userId: 2
    });
  }
};
