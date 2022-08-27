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
    tableName: "colors",
    timestamps: false,
    deletedAt: false
  }
  const color = sequelize.define(alias, cols, config)

  color.associate = function (models) {
    color.belongsToMany(models.product, {
      as: "products",
      through: "productscolors",
      foreignKey: "color_id",
      otherKey: "product_id",
      timestamps: false
    })
    return color
  }
}