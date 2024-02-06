import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";
import Order from "./Order";
import Product from "./Product";

class OrderItem extends Model {
  public id!: number;
  public quantity!: number;
  public price!: number;
  public sumPrice!: number;
  public orderId!: number;
  public productId!: number;
  public Product!: Product;
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sumPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: Order, // Reference the Category model
        key: "id", // Reference the id column in the Category model
      },
      onUpdate: "CASCADE", // Define the behavior on update
      onDelete: "SET NULL", // Define the behavior on delete
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: Product, // Reference the Category model
        key: "id", // Reference the id column in the Category model
      },
      onUpdate: "CASCADE", // Define the behavior on update
      onDelete: "SET NULL", // Define the behavior on delete
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "OrderItem",
    tableName: "orderItem",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default OrderItem;
