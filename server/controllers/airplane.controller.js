const { Airplane } = require("../models/index.model");

// [GET] /api/airplane/models: Lấy danh sách máy bay
exports.getAllAirplaneModels = async (req, res) => {
    try {
        const models = await Airplane.findAll({
            attributes: ["model"]
        });
        return res.status(200).json(models);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách hãng máy bay" });
    }
}

// [GET] /api/airplane: Lấy danh sách máy bay
exports.getAllAirplanes = async (req, res) => {
    try {
        const airplanes = await Airplane.findAll({
            attributes: ["id","model", "manufacturer", "seat_count"],
        })
        return res.status(200).json(airplanes);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy danh sách máy bay" });
    }
}