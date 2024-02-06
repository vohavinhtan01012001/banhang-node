import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";
import Category from "./Category";
import Promotion from "./Promotion";
import Size from "./Size";
import ProductGroup from "./ProductGroup";
import Order from "./Order";
import OrderItem from "./OrderItem";
import User from "./User";
import Favourite from "./Favourite";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public priceReduced!: number;
  public quantity!: number;
  public size!: string;
  public gender!: number;
  public status!: number;
  public image!: string;
  public image2!: string;
  public image3!: string;
  public image4!: string;
  public categoryId!: number;
  public promotionId!: number;
  public productGroupId!: number;
  public sizeId!: number;
  public Promotion!: Promotion | undefined;
  public Size!: Size;
  public Category!: Category;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Product.init(
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
    price: {
      type: DataTypes.FLOAT, // Đây là một ví dụ, bạn có thể sử dụng kiểu dữ liệu thích hợp cho giá tiền.
      allowNull: false,
    },
    priceReduced: {
      type: DataTypes.FLOAT, // Đây là một ví dụ, bạn có thể sử dụng kiểu dữ liệu thích hợp cho giá tiền.
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER, // Đây là một ví dụ, bạn có thể sử dụng kiểu dữ liệu thích hợp cho giá tiền.
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: Category, // Reference the Category model
        key: "id", // Reference the id column in the Category model
      },
      onUpdate: "CASCADE", // Define the behavior on update
      onDelete: "SET NULL", // Define the behavior on delete
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: Size, // Reference the Category model
        key: "id", // Reference the id column in the Category model
      },
      onUpdate: "CASCADE", // Define the behavior on update
      onDelete: "SET NULL", // Define the behavior on delete
    },
    promotionId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Change to allowNull: true for the optional association
      references: {
        model: Promotion, // Reference the Category model
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
    modelName: "Product",
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);
// Define the association
Product.belongsTo(Category, { foreignKey: "categoryId", targetKey: "id" });
Product.belongsTo(ProductGroup, {
  foreignKey: "productGroupId",
  targetKey: "id",
});
Product.belongsTo(Size, { foreignKey: "sizeId", targetKey: "id" });
Product.belongsTo(Promotion, { foreignKey: "promotionId", targetKey: "id" });
Category.hasMany(Product, { foreignKey: "categoryId", sourceKey: "id" });
Size.hasMany(Product, { foreignKey: "sizeId", sourceKey: "id" });
Promotion.hasMany(Product, { foreignKey: "promotionId", sourceKey: "id" });
ProductGroup.hasMany(Product, {
  foreignKey: "productGroupId",
  sourceKey: "id",
});
Order.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
Order.hasMany(OrderItem, { foreignKey: "orderId", sourceKey: "id" });
OrderItem.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", targetKey: "id" });
Favourite.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
Favourite.belongsTo(ProductGroup, {
  foreignKey: "productGroupId",
  targetKey: "id",
});
export default Product;
