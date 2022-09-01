module.exports = (sequelize, DataTypes) => {
    let alias = "productsizes";
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
        size_id: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "productsSizes",
        timestamps: false,
        deletedAt: false
    }

    const productSizes = sequelize.define(alias, cols, config)
    return productSizes
}