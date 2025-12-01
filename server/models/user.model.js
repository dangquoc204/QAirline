// models/users.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("customer", "admin"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "disabled"),
        allowNull: false,
        defaultValue: "active",
      },
      profilePicture: {
        type: DataTypes.STRING, // Change to STRING to store the path
        allowNull: true,
      },
    }, {
      tableName: "users", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    User.associate = function (models) {
      // Một user có thể là khách hàng hoặc admin
      User.hasOne(models.Customer, { foreignKey: "user_id" });
      User.hasOne(models.Admin, { foreignKey: "user_id" });
    };
  
    return User; // Trả về model User đã định nghĩa
  };
  