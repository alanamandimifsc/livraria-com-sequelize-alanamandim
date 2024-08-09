'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('instrumentos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome:{
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      tipo_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tipos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      situacao:{
        type: Sequelize.ENUM('novo', 'usado', 'quebrado'),
        allowNull: false,
        defaultValue: 'novo',
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('instrumentos')
  }
};
