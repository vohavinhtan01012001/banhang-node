import { DataTypes, Model, Sequelize } from "sequelize";
import sequelizeConnection from "../db/connection";
import Product from "./Product";

class Category extends Model {
  public id!: number;
  public name!: string;
  public description!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Category",
    tableName: "categories",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);


export default Category;
