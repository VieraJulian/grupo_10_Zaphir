module.exports = (sequelize, DataTypes) => {
    let alias = "imageproduct";
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          product_id: {
            type: DataTypes.INTEGER
          },
          image_id: {
            type: DataTypes.INTEGER
          }
    };
    let config = {
        tableName: "imagesproducts",
        timestamps: false,
        deletedAt: false
    }

    const imageproduct = sequelize.define(alias, cols, config)
    return imageproduct
}