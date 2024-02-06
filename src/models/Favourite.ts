import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeConnection from "../db/connection";
import Product from "./Product";
import User from "./User";
import ProductGroup from "./ProductGroup";

class Favourite extends Model {
  public id!: number;
  public User!: User;
  public ProductGroup!: ProductGroup;
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Favourite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: User, // Reference the Category model
        key: "id", // Reference the id column in the Category model
      },
      onUpdate: "CASCADE", // Define the behavior on update
      onDelete: "SET NULL", // Define the behavior on delete
    },
    productGroupId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: ProductGroup, // Reference the Category model
        key: "id", // Reference the id column in the Category model
      },
      onUpdate: "CASCADE", // Define the behavior on update
      onDelete: "SET NULL", // Define the behavior on delete
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Favourite",
    tableName: "favourite",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Favourite;
