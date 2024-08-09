'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissoes', {
       id:{
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
       },
       descricao:{
         type: Sequelize.STRING,
         allowNull: false,
         unique: true
       },
       createdAt: { 
         type: Sequelize.DATE,
         allowNull: false
       },
       updatedAt: { 
         type: Sequelize.DATE,
         allowNull: false
       },
       deletedAt: {
         type: Sequelize.DATE
       }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('permissoes'); 
  }
};
