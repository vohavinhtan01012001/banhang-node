import { DataTypes, Model, Sequelize } from "sequelize";
import Product from "./Product";
import sequelizeConnection from "../db/connection";

class ProductGroup extends Model {
  public id!: number;
  public Products!: Product[];
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

ProductGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "ProductGroup",
    tableName: "productGroup",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default ProductGroup;
