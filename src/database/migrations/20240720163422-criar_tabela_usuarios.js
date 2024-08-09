'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.createTable('usuarios', {
   id:{
     type: Sequelize.INTEGER,
     primaryKey: true,
     autoIncrement: true,
     allowNull: false
   },
   nome:{
     type: Sequelize.STRING(50),
     allowNull: false
   },
   email:{
     type: Sequelize.STRING(100),
     allowNull: false,
     unique: true
   },
   cpf:{
     type: Sequelize.STRING(14),
     allowNull: false,
     unique: true
   },
   data_nascimento:{
     type: Sequelize.DATE,
     allowNull: false
   },
   password_hash:{
     type: Sequelize.STRING,
     allowNull: false
   },
   createdAt:{
     type: Sequelize.DATE,
     allowNull: false
   },
   updatedAt:{
     type: Sequelize.DATE,
     allowNull: false
   },
   deletedAt:{
     type: Sequelize.DATE
   },
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
