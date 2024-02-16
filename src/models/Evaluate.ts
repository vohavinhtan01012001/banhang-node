import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";
import User from "./User";
import ProductGroup from "./ProductGroup";

class Evaluate extends Model {
  public id!: number;
  public userId!: number;
  public productGroupId!: number;
  public rate!: number;
  public User!: User;
  public ProductGroup!: ProductGroup;
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Evaluate.init(
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
    rate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Evaluate",
    tableName: "evaluate",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Evaluate;
