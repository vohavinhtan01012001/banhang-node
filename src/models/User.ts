import { DataTypes, Model } from "sequelize";
import { compareSync } from "../util/encrypt";
import sequelizeConnection from "../db/connection";

class User extends Model {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public phone!: string;
  public status!: boolean;

  // timestamps!
  public readonly created_at!: Date;
  public readonly last_updated!: Date;

  static validPassword: (password: string, hash: string) => boolean;
}

User.init(
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

User.validPassword = (password: string, hash: string) => {
  return compareSync(password, hash);
};

export default User;
