module.exports = (sequelize, DataTypes) => {
  let alias = "image"
  let cols = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    imagen: {
      type: DataTypes.TEXT
    }
  };
  let config = {
    timestamps: false,
    deleteAt: false,
  }

  const image = sequelize.define(alias, cols, config)

  image.associate = function (models) {
    image.hasMany(models.user, {
      as: 'users',
      foreignKey: 'imagen'
    }),
      image.belongsToMany(models.product, { //revisar
        through: 'imagesProducts',
        foreignKey: 'image_id'
      })
  }
  return image
}
