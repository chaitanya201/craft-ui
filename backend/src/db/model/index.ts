import Component from "./component.model";
import User from "./user.model";

User.hasMany(Component, { foreignKey: "userId", as: "components" });
Component.belongsTo(User, { foreignKey: "userId", as: "user" });

export { User, Component };
