// models/airplanes.js
module.exports = (sequelize, DataTypes) => {
    const Airplane = sequelize.define("Airplane", {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: true, 
      },
      seat_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: "airplanes", // Tên bảng trong cơ sở dữ liệu
      timestamps: true, // Tự động thêm createdAt và updatedAt
    });
  
    Airplane.associate = function (models) {
      // Mối quan hệ với bảng Flight
      Airplane.hasMany(models.Flight, { foreignKey: "airplane_id" }); // Liên kết với bảng Flight
    };
  
    return Airplane;
  };
  