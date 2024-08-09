const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Auditorios = connection.define('auditorios', {
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao:{
        type: DataTypes.STRING,
    },
    qtd_max:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    paranoid : true
})

module.exports = Auditorios