module.exports = (sequelize, DataTypes) => {
  let alias = 'product'
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
    },
    precioFinal: {
      type: DataTypes.MEDIUMINT
    },
    porciento: {
      type: DataTypes.TINYINT
    }

  }
  let config = {
    timestamps: false,
    deletedAt: false
  }
  const product = sequelize.define(alias, cols, config)

  product.associate = function (models) { //revisar
    product.belongsToMany(models.image, {
      as: "images",
      through: 'imagesProducts'
    }),

      product.belongsTo(models.color, { //revisar
        as: 'color',
        foreignKey: 'product_id'
      }),
      product.belongsTo(models.size, { //revisar
        as: 'size',
        foreignKey: 'product_id'
      })

  }
  return product
}