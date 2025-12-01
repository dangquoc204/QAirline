const { Booking } = require("../models/index.model");
const paymentGateway = require("../helpers/paymentGateway.helper");

const requireBooking = async (bookingId) => {
  if (!bookingId) {
    throw new Error("Thiếu bookingId");
  }
  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    throw new Error("Không tìm thấy booking");
  }
  return booking;
};

exports.processOnlinePayment = async (bookingId, amount, paymentDetails) => {
  const booking = await requireBooking(bookingId);

  if (booking.payment_status === "Paid") {
    throw new Error("Booking đã được thanh toán");
  }

  if (!paymentDetails || !paymentDetails.method) {
    throw new Error("Thiếu thông tin thanh toán");
  }

  const gatewayResult = await paymentGateway.charge(amount, paymentDetails);

  if (!gatewayResult.success) {
    booking.payment_status = "Failed";
    booking.payment_reference = gatewayResult.transactionId || null;
    await booking.save();
    return {
      status: "failed",
      reason: gatewayResult.message || "Thanh toán thất bại",
    };
  }

  booking.payment_status = "Paid";
  booking.payment_method = paymentDetails.method;
  booking.payment_reference = gatewayResult.transactionId;
  booking.status = "Confirmed";
  await booking.save();

  return {
    status: "success",
    transactionId: gatewayResult.transactionId,
  };
};

exports.handleOfflinePaymentSelection = async (bookingId, instructions = "") => {
  const booking = await requireBooking(bookingId);

  booking.payment_method = "Cash";
  booking.payment_status = "Pending";
  booking.offline_instructions = instructions;
  await booking.save();

  return {
    status: "pending",
    instructions,
  };
};

exports.confirmOfflinePayment = async (bookingId, staffCode = null) => {
  const booking = await requireBooking(bookingId);

  if (booking.payment_status !== "Pending") {
    throw new Error("Booking không ở trạng thái chờ thanh toán");
  }

  booking.payment_status = "Paid";
  booking.status = "Confirmed";
  booking.payment_reference = staffCode ? `OFFLINE-${staffCode}` : "OFFLINE";
  await booking.save();

  return {
    status: "success",
    payment_reference: booking.payment_reference,
  };
};

exports.getPaymentStatus = async (bookingId) => {
  const booking = await requireBooking(bookingId);

  return {
    payment_status: booking.payment_status,
    payment_method: booking.payment_method,
    payment_reference: booking.payment_reference,
    total_price: booking.total_price,
  };
};
