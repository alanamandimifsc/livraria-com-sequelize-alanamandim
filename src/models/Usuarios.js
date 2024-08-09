const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const { hashSync } = require("bcryptjs");
const Permissoes = require("./Permissoes");
const UsuariosPermissoes = require("./UsuariosPermissoes");

const Usuarios = connection.define("usuarios", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    paranoid : true
}
);

Usuarios.belongsToMany(Permissoes, {
     through: UsuariosPermissoes,
     foreignKey: 'usuario_id',
     otherKey: 'permissao_id'
})

Usuarios.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10);
    return usuario
})


module.exports = Usuarios