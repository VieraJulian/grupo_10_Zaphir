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
        deleteAt : false,
    }
    
    const Images = sequelize.define(alias,cols,config)

    Images.associate = function(models) {
        Images.hasMany(models.user, {
          as : 'users',
          foreignKey : 'imagen'
        }),
    Images.belongsToMany(models.product, {
        through: 'imagesProducts',
        foreignKey : 'images'
      })
    }
    return Images
}
