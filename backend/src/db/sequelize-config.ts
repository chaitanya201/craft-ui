import { Sequelize } from "sequelize";
import { CURRENT_ENV } from "../config/server-config";

const sequelize = new Sequelize({
  database: "uicomponent",
  username: "root",
  password: "1234",
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  // timezone: "+5:30",
  // dialectOptions: {
  //   useUTC: true,
  //   timezone: "+5:30",
  // },
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

// uncomment when table schema changes

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
