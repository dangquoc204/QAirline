module.exports.charge = async (amount, paymentDetails) => {
  if (!paymentDetails || !paymentDetails.method) {
    throw new Error("Thiếu thông tin thanh toán");
  }

  return {
    success: true,
    transactionId: `TX-${Date.now()}`,
    amount,
  };
};
