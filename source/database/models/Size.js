module.exports = (sequelize, DataTypes) => {
    let alias = "size"
    let cols = {  
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      color: {
        type: DataTypes.STRING
      }
    }
    let config = {
        timestamps : false,
        deletedAt: false
    }
    const product = sequelize.define(alias,cols,config)

    size.associate = function(models) {
      size.hasMany(models.product, {
        through: 'productsSizes',
        foreignKey : 'sizes'
      })
    return product
}
}