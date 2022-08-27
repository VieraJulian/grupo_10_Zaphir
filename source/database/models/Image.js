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
    tableName: "images",
    timestamps: false,
    deleteAt: false,
  }

  const image = sequelize.define(alias, cols, config)

  image.associate = function (models) {
    image.hasMany(models.user, {
      as: "users",
      foreignKey: "imagen"
    }),

      image.belongsTo(models.product, {
        as: "product",
        through: "imagesproducts",
        foreignKey: "image_id",
        otherKey: "product_id",
        timestamps: false
      })
  }
  return image
}
