const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Permissoes = connection.define("permissoes", {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    paranoid : true
}
);

module.exports = Permissoes