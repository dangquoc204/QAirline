const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { Post, Flight, Booking, Airplane, Passenger, Seat, User, Admin } = require('../models/index.model');

const ensureAdminUser = async (userId) => {
    const actor = await User.findByPk(userId);
    if (!actor || actor.role !== "admin") {
        throw new Error("Bạn không có quyền quản trị.");
    }
    return actor;
};

//[POST] /api/admin/post: Tạo bài viết mới

exports.createPost = async (
    title,
    image,
    cta,
    content,
    postType,
    startDate,
    endDate,
    adminId
) => {
    if (!title || !title.trim()) {
        throw new Error("Tiêu đề không được để trống.");
    }

    if (!content || !content.trim()) {
        throw new Error("Nội dung không được để trống.");
    }

    return await Post.create({
        title: title.trim(),
        image,
        cta,
        content: content.trim(),
        post_type: postType || null,
        start_date: startDate || null,
        end_date: endDate || null,
        admin_id: adminId
    });
}

// //[POST] /api/admin/airplane: Tạo máy bay mới
// exports.addAirplane = async (
//     model,
//     manufacturer,
//     seat_count,
//     airlineId
// ) => {
//     return await Airplain.create({
//         model,
//         manufacturer,
//         seat_count,
//         airlineId
//     });
// }

//[POST] /api/admin/flight: Tạo chuyến bay mới
exports.addFlight = async (
    flightNumber,
    origin,
    destination,
    departureTime,
    arrivalTime,
) => {
    return await Flight.create({
        flightNumber,
        flightNumber,
        origin,
        destination,
        departureTime,
        arrivalTime,
        status: "scheduled"
    })
}

// //[GET] /api/admin/bookings: Lấy danh sách đặt chỗ
exports.viewBookings = async () => {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Passenger,
          attributes: ["first_name", "last_name", "email", "phone"],
        },
        {
          model: Flight,
          as: "outboundFlight",
          attributes: [
            "flight_number",
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
          ],
        },
        {
          model: Flight,
          as: "returnFlight",
          attributes: [
            "flight_number",
            "origin",
            "destination",
            "departure_time",
            "arrival_time",
            "status",
          ],
        },
        {
          model: Seat,
          as: "outboundSeat",
          attributes: ["seat_number", "seat_type"],
        },
        {
          model: Seat,
          as: "returnSeat",
          attributes: ["seat_number", "seat_type"],
        },
      ],
    });
    return bookings;
}

//[PUT] api/admin/flight/:flightId/status Cập nhật trạng thái chuyến bay
exports.updateFlightStatus = async (flightId, newStatus) => {
    const flight = await Flight.findByPk(flightId);
    if(!flight) {
        throw new Error("Flight not found");
    }
    flight.status = newStatus;
    await flight.save();
    return flight;
}

//[PUT] api/admin/airplane/seatCount: Cập nhật số lượng ghế ngồi
exports.updateSeatCount = async (airplaneId, newSeatCount) => {
    const airplane = await Airplane.findByPk(airplaneId);
    if(!airplane) {
        throw new Error("Airplane not found");
    }
    airplane.seat_count = newSeatCount;
    await airplane.save();
    return airplane;
}

exports.createAdminAccount = async (actorId, payload) => {
    await ensureAdminUser(actorId);
    const existingUser = await User.findOne({ where: { email: payload.email } });
    if (existingUser) {
        throw new Error("Email đã được sử dụng cho tài khoản khác.");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const newUser = await User.create({
        email: payload.email,
        phone: payload.phone || null,
        password: hashedPassword,
        role: "admin",
        profilePicture: payload.profilePicture || null,
        status: "active",
    });

    await Admin.create({
        user_id: newUser.id,
        permissions: JSON.stringify(payload.permissions || []),
        username: payload.username || payload.email,
        password: hashedPassword,
    });

    return newUser;
};

exports.updateUserAccount = async (actorId, userId, updates) => {
    await ensureAdminUser(actorId);
    const target = await User.findByPk(userId);
    if (!target) {
        throw new Error("Tài khoản không tồn tại.");
    }

    if (updates.email) {
        const duplicate = await User.findOne({ where: { email: updates.email } });
        if (duplicate && duplicate.id !== target.id) {
            throw new Error("Email đã tồn tại.");
        }
        target.email = updates.email;
    }

    if (updates.role) {
        target.role = updates.role;
    }

    if (updates.status) {
        target.status = updates.status;
    }

    if (typeof updates.phone !== "undefined") {
        target.phone = updates.phone;
    }

    if (typeof updates.profilePicture !== "undefined") {
        target.profilePicture = updates.profilePicture;
    }

    if (updates.password) {
        target.password = await bcrypt.hash(updates.password, 10);
    }

    await target.save();
    return target;
};

exports.changeUserStatus = async (actorId, userId, status) => {
    if (!["active", "disabled"].includes(status)) {
        throw new Error("Trạng thái không hợp lệ.");
    }

    await ensureAdminUser(actorId);
    const target = await User.findByPk(userId);
    if (!target) {
        throw new Error("Tài khoản không tồn tại.");
    }
    target.status = status;
    await target.save();
    return target;
};

exports.deleteUserAccount = async (actorId, userId) => {
    await ensureAdminUser(actorId);
    if (actorId === userId) {
        throw new Error("Không thể tự xóa tài khoản đang đăng nhập.");
    }
    const target = await User.findByPk(userId);
    if (!target) {
        throw new Error("Tài khoản không tồn tại.");
    }
    await target.destroy();
    return true;
};

exports.searchUsers = async (actorId, filters = {}) => {
    await ensureAdminUser(actorId);
    const where = {};

    if (filters.role) {
        where.role = filters.role;
    }

    if (filters.status) {
        where.status = filters.status;
    }

    if (filters.keyword) {
        where[Op.or] = [
            { email: { [Op.like]: `%${filters.keyword}%` } },
            { phone: { [Op.like]: `%${filters.keyword}%` } },
        ];
    }

    return await User.findAll({ where });
};

//[GET] api/post: Lấy danh sách bài viết
exports.getPosts = async() => {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch(error) {
        console.error(error);
        throw new Error("Lấy danh sách bài viết thất bại");
    }
}

//[DELETE] api/post/:id: Xóa bài viết
exports.deletePost = async (id) => {
    const post = await Post.findByPk(id);
    if(!post) {
        throw new Error("Bài viết không tồn tại");
    }
    await post.destroy();
    return post;
}

//[PATCH] api/post/:id: Cập nhật bài viết
exports.editPost = async(id,title, image, cta, content, start_date, end_date) => {
    const post = await Post.findByPk(id);
    if(!post) {
        throw new Error("Bài viết không tồn tại");
    }
    if (title !== undefined) {
        if (!title.trim()) {
            throw new Error("Tiêu đề không được để trống.");
        }
        post.title = title.trim();
    }
    if (content !== undefined) {
        if (!content.trim()) {
            throw new Error("Nội dung không được để trống.");
        }
        post.content = content.trim();
    }
    if (image !== undefined) {
        post.image = image;
    }
    if (cta !== undefined) {
        post.cta = cta;
    }
    if (start_date !== undefined) {
        post.start_date = start_date;
    }
    if (end_date !== undefined) {
        post.end_date = end_date;
    }
    await post.save();
    return post;
}

exports.getPostById = async (id) => {
    const post = await Post.findByPk(id);
    if (!post) {
        throw new Error("Bài viết không tồn tại");
    }
    return post;
}

//[POST] /api/admin/airplane Them máy bay mới
exports.addAirplane = async (model, manufacturer, seat_count) => {
    return await Airplane.create({
        model,
        manufacturer,
        seat_count,
    });
}

//[PATCH] /api/admin/airplane/:id Cap nhật máy bay theo id
exports.updateAirplane = async (id, model, manufacturer, seat_count) => {
    const airplane = await Airplane.findByPk(id);
    if (!airplane) {
        throw new Error("Máy bay không tồn tại");
    }
    airplane.model = model;
    airplane.manufacturer = manufacturer;
    airplane.seat_count = seat_count;
    await airplane.save();
    return airplane;
}

// [DELETE] /api/admin/airplane/:id Xoa máy bay theo id
exports.deleteAirplane = async (id) => {
    const airplane = await Airplane.findByPk(id);
    if (!airplane) {
        throw new Error("Máy bay không tồn tại");
    }
    await airplane.destroy();
}