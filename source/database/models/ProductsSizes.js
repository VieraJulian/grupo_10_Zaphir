module.exports = (sequelize, DataTypes) => {
    let alias = "productsize";
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
        tableName: "productssizes",
        timestamps: false,
        deletedAt: false
    }

    const productsize = sequelize.define(alias, cols, config)
    return productsize
}