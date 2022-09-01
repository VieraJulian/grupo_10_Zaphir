module.exports = (sequelize, DataTypes) => {
    let alias = "productcolor";
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "products",
                key: "id"
            }
        },
        color_id: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "productscolors",
        timestamps: false,
        deletedAt: false
    }

    const productcolor = sequelize.define(alias, cols, config)
    return productcolor
}