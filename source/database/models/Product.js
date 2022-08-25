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
        timestamps : false,
        deletedAt: false
    }
    const product = sequelize.define(alias,cols,config)

    product.associate = function(models) {
      product.belongsToMany(models.image, {
            through: 'imagesProducts'
        }),

      product.belongsTo(models.color, {
            as : 'color',
            foreignKey : 'color'
      }),
      product.belongsTo(models.size, {
            as : 'size',
            foreignKey : 'size'
      })

    }
    return product
}