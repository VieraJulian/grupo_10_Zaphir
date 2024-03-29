module.exports = (sequelize, DataTypes) => {
  let alias = "size"
  let cols = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.STRING
    }
  }
  let config = {
    tableName: "sizes",
    timestamps: false,
    deletedAt: false
  }
  const size = sequelize.define(alias, cols, config)

  size.associate = function (models) {
    size.belongsToMany(models.product, {
      as: "products",
      through: "productssizes",
      foreignKey: "size_id",
      otherKey: "product_id",
      timestamps: false
    })
  }
  return size
}
