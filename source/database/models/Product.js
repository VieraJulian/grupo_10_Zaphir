module.exports = (sequelize, DataTypes) => {
  let alias = "product"
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
    descripcion: {
      type: DataTypes.TEXT
    },
    categoria: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.MEDIUMINT
    },
    precio: {
      type: DataTypes.MEDIUMINT
    },
    descuento: {
      type: DataTypes.SMALLINT
    }
  }
  let config = {
    tableName: "products",
    timestamps: false,
    deletedAt: false
  }
  const product = sequelize.define(alias, cols, config)

  product.associate = function (models) {
    product.belongsToMany(models.image, {
      as: "images",
      through: "imagesproducts",
      foreignKey: "product_id",
      otherKey: "image_id",
      timestamps: false
    }),

      product.belongsToMany(models.color, {
        as: "colors",
        through: "productscolors",
        foreignKey: "product_id",
        otherKey: "color_id",
        timestamps: false
      }),
      product.belongsToMany(models.size, {
        as: "sizes",
        through: "productssizes",
        foreignKey: "product_id",
        otherKey: "size_id",
        timestamps: false
      })

  }
  return product
}
