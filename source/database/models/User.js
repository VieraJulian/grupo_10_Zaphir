module.exports = (sequelize, DataTypes) => {
  let alias = "user";
  let cols = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.TEXT
    },
    telefono: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    imagen: {
      type: DataTypes.INTEGER
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  };

  let config = {
    timestamps: false,
    deletedAt: false
  }

  const user = sequelize.define(alias, cols, config);

  user.associate = function(models) {
    user.belongsTo(models.image, {
      as : 'image',
      foreignKey : 'imagen'
    })
  }

  return user

}