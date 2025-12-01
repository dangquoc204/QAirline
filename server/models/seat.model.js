// models/seats.js
module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define("Seat", {
      seat_type: {
        type: DataTypes.ENUM("Economy", "Premium"),
        allowNull: false, // Đảm bảo rằng seat_type không để trống
      },
      seat_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    }, {
      tableName: "seats", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    Seat.associate = function (models) {
      // Mối quan hệ với bảng Flight
      Seat.belongsTo(models.Flight, { foreignKey: "flight_id" });
  
      // Mối quan hệ với bảng Booking
      Seat.hasMany(models.Booking, { foreignKey: "outbound_seat_id", as: "outboundBookings" });
      Seat.hasMany(models.Booking, { foreignKey: "return_seat_id", as: "returnBookings" });
    };
  
    return Seat;
  };
  