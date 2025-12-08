const Sequelize = require("sequelize");

const isTest = process.env.NODE_ENV === "test";

const sequelize = isTest
   ? new Sequelize("sqlite::memory:", { logging: false })
   : new Sequelize(
         process.env.DATABASE_NAME,
         process.env.DATABASE_USERNAME,
         process.env.DATABASE_PASSWORD,
         {
            host: process.env.DATABASE_HOST,
            dialect: "mysql",
         }
      );

if (!isTest) {
   sequelize
      .authenticate()
      .then(() => {
         console.log("Kết nối database thành công.");
      })
      .catch((error) => {
         console.error("Kết nối database thất bại", error);
      });
}

module.exports = sequelize;