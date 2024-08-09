const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const UsuariosPermissoes = connection.define("usuarios_permissoes", {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    permissao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'permissoes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
},
{
    paranoid : true
}
)

module.exports = UsuariosPermissoes