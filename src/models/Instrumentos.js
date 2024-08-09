const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Instrumentos = connection.define('instrumentos', {
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tipo_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tipos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    situacao:{
        type: DataTypes.ENUM('novo', 'usado', 'quebrado'),
        allowNull: false,
        defaultValue: 'novo',
    },
}, 
{
    paranoid : true
})

module.exports = Instrumentos