module.exports = (sequelize, DataTypes) => {
    let alias = "color"
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
    const color = sequelize.define(alias,cols,config)

    color.associate = function(models) { //revisar
      color.hasMany(models.product, {
        through: 'productsColors',
        foreignKey : 'color_id'
      })
    return color
}
}
