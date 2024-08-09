const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Leitores = connection.define('leitores', {
      nome:{
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      data_nascimento:{
        type: DataTypes.DATE,
        allowNull: false
      },
},
{
    paranoid : true
})

module.exports = Leitores