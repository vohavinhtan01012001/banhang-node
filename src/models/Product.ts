import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";
import Category from "./Category";

class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public priceReduced!: number;
  public quantity!: number;
  public gender!: number;
  public status!: number;
  public image!: string;
  public image2!: string;
  public image3!: string;
  public image4!: string;
  public categoryId!: number; // Thêm cột categoryId để đại diện cho mối quan hệ một-nhiều

  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  static associate(models: any) {
    Product.belongsTo(models.Category, {
      onDelete: "CASCADE",
    });
  }
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
      allowNull: false,
      references: {
        model: "categories", // Tham chiếu đến bảng categories
        key: "id", // Tham chiếu đến cột id trong bảng categories
      },
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
Product.belongsTo(Category, { foreignKey: "categoryId" });

export default Product;
