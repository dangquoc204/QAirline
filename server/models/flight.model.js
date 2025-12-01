// models/flights.js
module.exports = (sequelize, DataTypes) => {
    const Flight = sequelize.define("Flight", {
      flight_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departure_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      arrival_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Đã lên lịch", "Chậm chuyến", "Đã hủy"),
        allowNull: true,
      },
    }, {
      tableName: "flights", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    Flight.associate = function (models) {
      Flight.belongsTo(models.Airplane, { foreignKey: "airplane_id", onDelete: 'CASCADE' });
      Flight.hasMany(models.Booking, { foreignKey: "outbound_flight_id", as: "outboundBookings" });
      Flight.hasMany(models.Booking, { foreignKey: "return_flight_id", as: "returnBookings" });
      Flight.hasMany(models.Seat, { foreignKey: "flight_id" });
    };
  
    return Flight;
  };
