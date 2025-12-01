const paymentService = require("../service/payment.service");
const { Booking } = require("../models/index.model");
const paymentGateway = require("../helpers/paymentGateway.helper");

jest.mock("../models/index.model", () => ({
  Booking: {
    findByPk: jest.fn(),
  },
}));

jest.mock("../helpers/paymentGateway.helper", () => ({
  charge: jest.fn(),
}));

const mockBooking = (overrides = {}) => ({
  id: 1,
  total_price: 100,
  payment_status: "Pending",
  payment_method: "Credit Card",
  status: "Pending",
  payment_reference: null,
  offline_instructions: null,
  save: jest.fn().mockResolvedValue(),
  ...overrides,
});

describe("Payment Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("processOnlinePayment", () => {
    it("marks booking paid when gateway succeeds", async () => {
      const booking = mockBooking();
      Booking.findByPk.mockResolvedValue(booking);
      paymentGateway.charge.mockResolvedValue({ success: true, transactionId: "TX123" });

      const result = await paymentService.processOnlinePayment(1, 100, { method: "Credit Card" });

      expect(paymentGateway.charge).toHaveBeenCalledWith(100, { method: "Credit Card" });
      expect(booking.payment_status).toBe("Paid");
      expect(booking.payment_reference).toBe("TX123");
      expect(booking.status).toBe("Confirmed");
      expect(booking.save).toHaveBeenCalled();
      expect(result).toEqual({ status: "success", transactionId: "TX123" });
    });

    it("returns failed response when gateway fails", async () => {
      const booking = mockBooking();
      Booking.findByPk.mockResolvedValue(booking);
      paymentGateway.charge.mockResolvedValue({ success: false, message: "Declined", transactionId: "TX999" });

      const result = await paymentService.processOnlinePayment(2, 200, { method: "PayPal" });

      expect(booking.payment_status).toBe("Failed");
      expect(result).toEqual({ status: "failed", reason: "Declined" });
    });

    it("throws when booking not found", async () => {
      Booking.findByPk.mockResolvedValue(null);

      await expect(
        paymentService.processOnlinePayment(10, 100, { method: "Credit Card" })
      ).rejects.toThrow("Không tìm thấy booking");
    });
  });

  describe("handleOfflinePaymentSelection", () => {
    it("sets booking to pending with instructions", async () => {
      const booking = mockBooking();
      Booking.findByPk.mockResolvedValue(booking);

      const result = await paymentService.handleOfflinePaymentSelection(3, "Thanh toán tại quầy trước 24h");

      expect(booking.payment_method).toBe("Cash");
      expect(booking.payment_status).toBe("Pending");
      expect(booking.offline_instructions).toBe("Thanh toán tại quầy trước 24h");
      expect(result).toEqual({ status: "pending", instructions: "Thanh toán tại quầy trước 24h" });
    });
  });

  describe("confirmOfflinePayment", () => {
    it("confirms payment when status is pending", async () => {
      const booking = mockBooking({ payment_status: "Pending" });
      Booking.findByPk.mockResolvedValue(booking);

      const result = await paymentService.confirmOfflinePayment(4, "STAFF01");

      expect(booking.payment_status).toBe("Paid");
      expect(booking.payment_reference).toBe("OFFLINE-STAFF01");
      expect(result).toEqual({ status: "success", payment_reference: "OFFLINE-STAFF01" });
    });

    it("throws when booking is not pending", async () => {
      const booking = mockBooking({ payment_status: "Paid" });
      Booking.findByPk.mockResolvedValue(booking);

      await expect(paymentService.confirmOfflinePayment(4)).rejects.toThrow(
        "Booking không ở trạng thái chờ thanh toán"
      );
    });
  });

  describe("getPaymentStatus", () => {
    it("returns payment summary for UI", async () => {
      const booking = mockBooking({ payment_status: "Paid", payment_method: "PayPal", payment_reference: "TX888" });
      Booking.findByPk.mockResolvedValue(booking);

      const result = await paymentService.getPaymentStatus(5);

      expect(result).toEqual({
        payment_status: "Paid",
        payment_method: "PayPal",
        payment_reference: "TX888",
        total_price: 100,
      });
    });
  });
});
