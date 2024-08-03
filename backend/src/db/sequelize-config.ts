import { Sequelize } from "sequelize-typescript";
import { CURRENT_ENV } from "../config/server-config";

const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "1234",
  database: "uicomponent",
  port: 3306,
  dialect: "mysql",
  models: [__dirname + "/model"],
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: any) => {
    console.error("Unable to connect to the database:", error);
  });

if (CURRENT_ENV === "development") {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Ran sync on DB");
    })
    .catch((error) => {
      console.log("Error while syncing DB ", error);
    });
}

export default sequelize;
