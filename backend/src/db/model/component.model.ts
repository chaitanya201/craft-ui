import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize-config";

class Component extends Model {}

Component.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    description: { type: DataTypes.STRING(500), allowNull: false },
    code: { type: DataTypes.STRING(1000), allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN(), defaultValue: true },
  },
  { sequelize: sequelize, tableName: "Component" }
);

export default Component;
