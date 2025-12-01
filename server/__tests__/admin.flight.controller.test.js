const adminController = require("../controllers/admin.controller");
const flightService = require("../service/flight.service");
const { Flight, Airplane } = require("../models/index.model");

jest.mock("../service/flight.service", () => ({
  addFlight: jest.fn(),
  editFlight: jest.fn(),
  deleteFlight: jest.fn(),
}));

jest.mock("../models/index.model", () => ({
  Flight: {
    findByPk: jest.fn(),
  },
  Airplane: {},
  Admin: {},
  Post: {},
  Booking: {},
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Admin Controller - Flight endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("addFlight", () => {
    it("creates flight and returns hydrated record", async () => {
      const req = {
        body: {
          flightNumber: "VN123",
          origin: "HAN",
          destination: "SGN",
          departureTime: "2025-12-01T08:00:00Z",
          arrivalTime: "2025-12-01T10:00:00Z",
          status: "scheduled",
          airplaneModel: "A321",
        },
      };
      const res = mockResponse();

      flightService.addFlight.mockResolvedValueOnce({ id: 55 });
      Flight.findByPk.mockResolvedValueOnce({ id: 55, flight_number: "VN123" });

      await adminController.addFlight(req, res);

      expect(flightService.addFlight).toHaveBeenCalledWith(
        "VN123",
        "HAN",
        "SGN",
        "2025-12-01T08:00:00Z",
        "2025-12-01T10:00:00Z",
        "scheduled",
        "A321"
      );
      expect(Flight.findByPk).toHaveBeenCalledWith(55, {
        include: {
          model: Airplane,
          attributes: ["model"],
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 55, flight_number: "VN123" });
    });

    it("returns 500 when service throws", async () => {
      const req = { body: {} };
      const res = mockResponse();

      flightService.addFlight.mockRejectedValueOnce(new Error("db fail"));

      await adminController.addFlight(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Lỗi khi thêm chuyến bay" });
    });
  });

  describe("editFlight", () => {
    it("updates flight and returns payload", async () => {
      const req = {
        params: { id: "88" },
        body: {
          flightNumber: "VN888",
          origin: "DAD",
          destination: "PQC",
          departureTime: "2025-12-02T08:00:00Z",
          arrivalTime: "2025-12-02T10:00:00Z",
          status: "scheduled",
          airplaneModel: "A350",
        },
      };
      const res = mockResponse();
      const updatedFlight = { id: 88, flight_number: "VN888" };

      flightService.editFlight.mockResolvedValueOnce(updatedFlight);

      await adminController.editFlight(req, res);

      expect(flightService.editFlight).toHaveBeenCalledWith(
        "88",
        "VN888",
        "DAD",
        "PQC",
        "2025-12-02T08:00:00Z",
        "2025-12-02T10:00:00Z",
        "scheduled",
        "A350"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedFlight);
    });

    it("returns 500 when edit fails", async () => {
      const req = { params: { id: "1" }, body: {} };
      const res = mockResponse();

      flightService.editFlight.mockRejectedValueOnce(new Error("boom"));

      await adminController.editFlight(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Lỗi khi cập nhật chuyến bay" });
    });
  });

  describe("deleteFlight", () => {
    it("deletes flight and returns success message", async () => {
      const req = { params: { id: "77" } };
      const res = mockResponse();

      flightService.deleteFlight.mockResolvedValueOnce();

      await adminController.deleteFlight(req, res);

      expect(flightService.deleteFlight).toHaveBeenCalledWith("77");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Xóa chuyến bay thành công" });
    });

    it("maps missing flight error to 404", async () => {
      const req = { params: { id: "404" } };
      const res = mockResponse();

      flightService.deleteFlight.mockRejectedValueOnce(new Error("Chuyến bay không tồn tại"));

      await adminController.deleteFlight(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Chuyến bay không tồn tại" });
    });

    it("returns 500 for unexpected delete errors", async () => {
      const req = { params: { id: "13" } };
      const res = mockResponse();

      flightService.deleteFlight.mockRejectedValueOnce(new Error("db down"));

      await adminController.deleteFlight(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Lỗi khi xóa chuyến bay" });
    });
  });
});
