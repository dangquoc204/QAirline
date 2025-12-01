const customerController = require("../controllers/customer.controller");
const {
  Booking,
  Flight,
  Customer,
  Seat,
  Passenger,
} = require("../models/index.model");

jest.mock("../models/index.model", () => ({
  Booking: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
  },
  Flight: {
    findByPk: jest.fn(),
  },
  Customer: {
    findOne: jest.fn(),
  },
  Seat: {
    findOne: jest.fn(),
  },
  Passenger: {
    create: jest.fn(),
  },
  Airplane: {},
  User: {},
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Customer Controller - Booking Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createBooking", () => {
    const baseReq = () => ({
      userId: 1,
      body: {
        totalPrice: 100,
        outboundFlight: { id: 10, departure_time: "2025-12-01", seat_id: 50 },
        returnFlight: null,
        passengerDetails: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "0123",
        },
        paymentDetails: {
          paymentMethod: "Credit Card",
          cardholderName: "John",
          cardNumber: "4111",
          expiryDate: "12/25",
          cvv: "123",
        },
        booking_code: "ABC123",
      },
    });

    it("creates booking for logged-in user and marks seat unavailable", async () => {
      const req = baseReq();
      const res = mockResponse();

      Customer.findOne.mockResolvedValue({ id: 7 });
      Flight.findByPk.mockResolvedValue({ id: 10 });
      const mockSeat = { is_available: true, save: jest.fn().mockResolvedValue() };
      Seat.findOne.mockResolvedValue(mockSeat);
      const createdBooking = { id: 99 };
      Booking.create.mockResolvedValue(createdBooking);

      await customerController.createBooking(req, res);

      expect(Customer.findOne).toHaveBeenCalledWith({ where: { user_id: 1 } });
      expect(Flight.findByPk).toHaveBeenCalledWith(10);
      expect(Booking.create).toHaveBeenCalledWith(
        expect.objectContaining({ customer_id: 7, booking_code: "ABC123" })
      );
      expect(mockSeat.is_available).toBe(false);
      expect(mockSeat.save).toHaveBeenCalled();
      expect(Passenger.create).toHaveBeenCalledWith(
        expect.objectContaining({ booking_id: 99, first_name: "John" })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdBooking);
    });

    it("returns 400 when required fields missing", async () => {
      const req = { body: { totalPrice: 100 } };
      const res = mockResponse();

      await customerController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Thiếu trường thông tin gửi" });
    });

    it("returns 404 when outbound flight not found", async () => {
      const req = baseReq();
      const res = mockResponse();

      Customer.findOne.mockResolvedValue({ id: 7 });
      Flight.findByPk.mockResolvedValueOnce(null);

      await customerController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Không tìm được chuyến bay đi" });
      expect(Booking.create).not.toHaveBeenCalled();
    });
  });

  describe("createBookingNotLogin", () => {
    const baseReq = () => ({
      body: {
        totalPrice: 150,
        outboundFlight: { id: 11, departure_time: "2025-12-02", seat_id: 60 },
        returnFlight: { id: 12, departure_time: "2025-12-05", seat_id: 61 },
        passengerDetails: {
          firstName: "Guest",
          lastName: "User",
          email: "guest@example.com",
          phone: "0999",
        },
        paymentDetails: {
          paymentMethod: "Cash",
          cardholderName: "Guest",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        },
        booking_code: "GUEST1",
      },
    });

    it("creates booking without customer id and updates both seats", async () => {
      const req = baseReq();
      const res = mockResponse();

      Flight.findByPk
        .mockResolvedValueOnce({ id: 11 })
        .mockResolvedValueOnce({ id: 12 });
      const seatOutbound = { save: jest.fn().mockResolvedValue(), is_available: true };
      const seatReturn = { save: jest.fn().mockResolvedValue(), is_available: true };
      Seat.findOne
        .mockResolvedValueOnce(seatOutbound)
        .mockResolvedValueOnce(seatReturn);
      Booking.create.mockResolvedValue({ id: 200 });

      await customerController.createBookingNotLogin(req, res);

      expect(Booking.create).toHaveBeenCalledWith(
        expect.objectContaining({ customer_id: null, booking_code: "GUEST1" })
      );
      expect(seatOutbound.is_available).toBe(false);
      expect(seatReturn.is_available).toBe(false);
      expect(seatReturn.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 404 when return flight missing", async () => {
      const req = baseReq();
      const res = mockResponse();

      Flight.findByPk.mockResolvedValueOnce({ id: 11 }).mockResolvedValueOnce(null);

      await customerController.createBookingNotLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Không tìm được chuyến bay đi" });
    });
  });

  describe("cancelBooking", () => {
    it("cancels booking owned by logged-in customer", async () => {
      const req = { userId: 5, params: { id: 30 } };
      const res = mockResponse();

      Customer.findOne.mockResolvedValue({ id: 9 });
      const booking = { customer_id: 9, status: "Confirmed", save: jest.fn().mockResolvedValue() };
      Booking.findByPk.mockResolvedValue(booking);

      await customerController.cancelBooking(req, res);

      expect(booking.status).toBe("Cancelled");
      expect(booking.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Hủy booking thành công" });
    });

    it("returns 403 when booking belongs to another customer", async () => {
      const req = { userId: 5, params: { id: 30 } };
      const res = mockResponse();

      Customer.findOne.mockResolvedValue({ id: 9 });
      Booking.findByPk.mockResolvedValue({ customer_id: 99 });

      await customerController.cancelBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Bạn không có quyền hủy booking này" });
    });
  });

  describe("cancelBookingNotLogin", () => {
    it("cancels booking without ownership check", async () => {
      const req = { params: { id: 44 } };
      const res = mockResponse();
      const booking = { status: "Confirmed", save: jest.fn().mockResolvedValue() };

      Booking.findByPk.mockResolvedValue(booking);

      await customerController.cancelBookingNotLogin(req, res);

      expect(booking.status).toBe("Cancelled");
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("returns 404 when booking missing", async () => {
      const req = { params: { id: 44 } };
      const res = mockResponse();

      Booking.findByPk.mockResolvedValue(null);

      await customerController.cancelBookingNotLogin(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Không tìm thấy booking" });
    });
  });

  describe("getBookingsDetail", () => {
    it("returns booking detail when booking_code matches", async () => {
      const req = { query: { booking_code: "PNR123" } };
      const res = mockResponse();
      const booking = { booking_code: "PNR123" };

      Booking.findOne.mockResolvedValue(booking);

      await customerController.getBookingsDetail(req, res);

      expect(Booking.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { booking_code: "PNR123" } })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy thông tin booking thành công",
        booking,
      });
    });

    it("returns 404 when booking not found", async () => {
      const req = { query: { booking_code: "PNR123" } };
      const res = mockResponse();

      Booking.findOne.mockResolvedValue(null);

      await customerController.getBookingsDetail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Không tìm thấy booking" });
    });
  });
});
