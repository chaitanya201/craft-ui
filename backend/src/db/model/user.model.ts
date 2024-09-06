import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize-config";

class User extends Model {}

User.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING({ length: 128 }),
      allowNull: false,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING({ length: 128 }),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING({ length: 128 }),
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING(),
      unique: true,
    },
    isActive: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  },
  { sequelize, tableName: "Users" }
);

export default User;
