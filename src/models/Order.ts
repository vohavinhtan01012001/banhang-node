import { DataTypes, Model } from "sequelize";
import User from "./User";
import OrderItem from "./OrderItem";
import sequelizeConnection from "../db/connection";

class Order extends Model {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public note!: string;
  public sumPrice!: number;
  public status!: number;
  public pay!: number;
  public vnp_TxnRef!: string;
  public delivery!: number;
  public cancelOrder!: number;
  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    sumPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    pay: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    vnp_TxnRef: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    delivery: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    cancelOrder: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
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
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Order",
    tableName: "orders",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Order;
