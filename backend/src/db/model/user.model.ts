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
      allowNull: true,
      defaultValue: null,
    },
    source: {
      type: DataTypes.ENUM("local", "google", "github"),
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: null,
    },
    redirectionToken: {
      type: DataTypes.STRING(),
      allowNull: true,
      defaultValue: null,
    },
    sessionId: {
      type: DataTypes.STRING(),
      allowNull: true,
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
