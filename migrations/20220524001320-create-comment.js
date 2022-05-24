'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdUserId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        reference: {
          model: "Users",
          key: "id",
          as: 'createdUserId',
        }
      },
      content: {
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        reference: {
          model: "Posts",
          key: "id",
          as: 'postId',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};