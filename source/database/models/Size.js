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

    size.associate = function(models) { //revisar
      size.hasMany(models.product, {
        through: 'productsSizes',
        foreignKey : 'size_id'
      })
    return product
}
}