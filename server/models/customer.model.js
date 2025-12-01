// models/customers.js
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Khóa ngoại không được null
        // references: {
        //   model: "Users", // Tên bảng 'Users' trong DB
        //   key: "id",
        // },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      middle_name: DataTypes.STRING,
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "other"),
      },
      promo_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: "customers", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    Customer.associate = function (models) {
      // Customer liên kết với User thông qua user_id
      Customer.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
      Customer.hasMany(models.Booking, { foreignKey: "customer_id" });
    };
  
    return Customer;
  };
  