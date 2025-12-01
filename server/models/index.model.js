// models/index.js
const sequelize = require("../config/database");
const User = require("./user.model")(sequelize, require("sequelize").DataTypes);
const Customer = require("./customer.model")(
  sequelize,
  require("sequelize").DataTypes
);
const Admin = require("./admin.model")(sequelize, require("sequelize").DataTypes);
const Post = require("./post.model")(sequelize, require("sequelize").DataTypes);
const Flight = require("./flight.model")(sequelize, require("sequelize").DataTypes);
const Booking = require("./booking.model")(
  sequelize,
  require("sequelize").DataTypes
);
const Seat = require("./seat.model")(sequelize, require("sequelize").DataTypes);

const Airplane = require("./airplane.model")(
  sequelize,
  require("sequelize").DataTypes
);

const Passenger = require("./passenger.model")(
  sequelize,
  require("sequelize").DataTypes
);

// Định nghĩa mối quan hệ
User.associate({ Customer, Admin });
Customer.associate({ User, Booking });
Admin.associate({ User, Post });
Post.associate({ Admin });
Flight.associate({ Airplane, Booking, Seat });
Booking.associate({ Customer, Flight, Seat, Passenger });
Seat.associate({ Flight, Booking });
Airplane.associate({ Flight });
Passenger.associate({ Booking });

module.exports = {
  User,
  Customer,
  Admin,
  Post,
  Flight,
  Booking,
  Seat,
  Airplane,
  Passenger,
  sequelize,
};