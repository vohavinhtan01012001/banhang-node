import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";

class Promotion extends Model {
  public id!: number;
  public title!: string;
  public discount!: string | null;
  public startDate!: Date | null;
  public endDate!: Date | null;
  public status!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Promotion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Promotion",
    tableName: "promotions",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Promotion;
