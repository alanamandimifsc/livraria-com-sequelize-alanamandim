'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('auditorios', {
     id:{
       type:Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
     },
     nome:{
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
     },
     descricao:{
       type: Sequelize.STRING,
     },
     qtd_max:{
       type: Sequelize.INTEGER,
       allowNull: false
     },
     createdAt:{
       type:Sequelize.DATE,
       allowNull: false
     },
     updatedAt:{
       type:Sequelize.DATE,
       allowNull: false
     },
     deletedAt:{
       type:Sequelize.DATE
     }
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('auditorios')
  }
};
