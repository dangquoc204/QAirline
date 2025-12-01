const flightService = require("../service/flight.service");
const { Flight, Airplane } = require("../models/index.model");

jest.mock("../models/index.model", () => ({
  Flight: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
  Airplane: {
    findOne: jest.fn(),
  },
}));

describe("Flight Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllFlights", () => {
    it("returns list of flights with airplane info", async () => {
      const mockFlights = [{ id: 1 }, { id: 2 }];
      Flight.findAll.mockResolvedValue(mockFlights);

      const result = await flightService.getAllFlights();

      expect(Flight.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: expect.anything(),
            attributes: ["model", "manufacturer"],
          },
        ],
        attributes: [
          "id",
          "flight_number",
          "origin",
          "destination",
          "departure_time",
          "arrival_time",
          "duration",
          "status",
        ],
      });
      expect(result).toBe(mockFlights);
    });

    it("throws when database fails", async () => {
      Flight.findAll.mockRejectedValue(new Error("db down"));

      await expect(flightService.getAllFlights()).rejects.toThrow("db down");
    });
  });

  describe("addFlight", () => {
    it("creates a flight when airplane exists", async () => {
      const airplane = { id: 9 };
      const createdFlight = { id: 1 };
      Airplane.findOne.mockResolvedValue(airplane);
      Flight.create.mockResolvedValue(createdFlight);

      const result = await flightService.addFlight(
        "VN001",
        "HAN",
        "SGN",
        "2025-12-01T08:00:00Z",
        "2025-12-01T10:00:00Z",
        "Đã lên lịch",
        "A321"
      );

      expect(Airplane.findOne).toHaveBeenCalledWith({ where: { model: "A321" } });
      expect(Flight.create).toHaveBeenCalledWith(
        expect.objectContaining({
          flight_number: "VN001",
          duration: "2h0m",
          airplane_id: 9,
        })
      );
      expect(result).toBe(createdFlight);
    });

    it("throws when airplane does not exist", async () => {
      Airplane.findOne.mockResolvedValue(null);

      await expect(
        flightService.addFlight("VN002", "HAN", "SGN", "2025-12-01", "2025-12-01", "Đã lên lịch", "A999")
      ).rejects.toThrow("Máy bay không tồn tại");
    });
  });

  describe("editFlight", () => {
    it("updates flight data and returns refreshed flight", async () => {
      const flightRecord = {
        id: 5,
        save: jest.fn().mockResolvedValue(),
      };
      const updatedFlight = { id: 5, flight_number: "VN777" };

      Flight.findByPk
        .mockResolvedValueOnce(flightRecord)
        .mockResolvedValueOnce(updatedFlight);
      Airplane.findOne.mockResolvedValue({ id: 3 });

      const result = await flightService.editFlight(
        5,
        "VN777",
        "HAN",
        "SGN",
        "2025-12-10T08:00:00Z",
        "2025-12-10T11:30:00Z",
        "Đã lên lịch",
        "A350"
      );

      expect(flightRecord.flight_number).toBe("VN777");
      expect(flightRecord.duration).toBe("3h30m");
      expect(flightRecord.airplane_id).toBe(3);
      expect(flightRecord.save).toHaveBeenCalled();
      expect(Flight.findByPk).toHaveBeenCalledTimes(2);
      expect(result).toBe(updatedFlight);
    });

    it("throws when flight not found", async () => {
      Flight.findByPk.mockResolvedValue(null);

      await expect(
        flightService.editFlight(999, "VN", "A", "B", "2025", "2025", "Đã lên lịch", "A321")
      ).rejects.toThrow("Chuyến bay không tồn tại");
    });

    it("throws when airplane not found", async () => {
      const flightRecord = { save: jest.fn() };
      Flight.findByPk.mockResolvedValue(flightRecord);
      Airplane.findOne.mockResolvedValue(null);

      await expect(
        flightService.editFlight(1, "VN", "A", "B", "2025", "2025", "Đã lên lịch", "Unknown")
      ).rejects.toThrow("Máy bay không tồn tại");
      expect(flightRecord.save).not.toHaveBeenCalled();
    });
  });

  describe("deleteFlight", () => {
    it("removes flight when it exists", async () => {
      const flightRecord = { destroy: jest.fn().mockResolvedValue() };
      Flight.findByPk.mockResolvedValue(flightRecord);

      await flightService.deleteFlight(12);

      expect(Flight.findByPk).toHaveBeenCalledWith(12);
      expect(flightRecord.destroy).toHaveBeenCalled();
    });

    it("throws error when flight missing", async () => {
      Flight.findByPk.mockResolvedValue(null);

      await expect(flightService.deleteFlight(99)).rejects.toThrow("Chuyến bay không tồn tại");
    });
  });
});
