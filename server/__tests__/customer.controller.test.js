const customerController = require("../controllers/customer.controller");
const { Customer, User } = require("../models/index.model");
const bcrypt = require("bcrypt");

jest.mock("../models/index.model", () => ({
  Booking: {},
  Flight: {},
  Customer: {
    findOne: jest.fn(),
  },
  Seat: {},
  Passenger: {},
  Airplane: {},
  User: {
    findOne: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Customer Controller - User Module", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProfile", () => {
    it("returns profile when customer exists", async () => {
      const req = { userId: 1 };
      const res = mockResponse();

      const mockCustomer = {
        get: jest.fn().mockReturnValue({ id: 10, first_name: "John" }),
      };
      Customer.findOne.mockResolvedValue(mockCustomer);

      await customerController.getProfile(req, res);

      expect(Customer.findOne).toHaveBeenCalledWith({
        where: { user_id: 1 },
        include: [
          {
            model: expect.anything(),
            attributes: ["profilePicture", "email", "phone"],
          },
        ],
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy thông tin người dùng thành công",
        customer: { id: 10, first_name: "John" },
      });
    });

    it("returns 404 when customer missing", async () => {
      const req = { userId: 2 };
      const res = mockResponse();

      Customer.findOne.mockResolvedValue(null);

      await customerController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Không tìm thấy thông tin người dùng",
      });
    });

    it("returns 500 on unexpected error", async () => {
      const req = { userId: 3 };
      const res = mockResponse();

      Customer.findOne.mockRejectedValue(new Error("db error"));

      await customerController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lỗi khi lấy thông tin người dùng",
      });
    });
  });

  describe("updateProfile", () => {
    it("updates both user and customer details", async () => {
      const req = {
        userId: 4,
        body: {
          email: "new@example.com",
          phone: "0901",
          first_name: "Jane",
          last_name: "Doe",
        },
      };
      const res = mockResponse();

      const mockUser = {
        email: "old@example.com",
        phone: "0000",
        profilePicture: null,
        save: jest.fn().mockResolvedValue(),
      };
      const mockCustomer = {
        update: jest.fn().mockResolvedValue(),
      };

      User.findOne.mockResolvedValue(mockUser);
      Customer.findOne.mockResolvedValue(mockCustomer);

      await customerController.updateProfile(req, res);

      expect(mockUser.email).toBe("new@example.com");
      expect(mockUser.phone).toBe("0901");
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockCustomer.update).toHaveBeenCalledWith(
        expect.objectContaining({ first_name: "Jane", last_name: "Doe" })
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Profile updated successfully" })
      );
    });

    it("returns 404 when user not found", async () => {
      const req = { userId: 5, body: {} };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await customerController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Không tìm thấy người dùng",
      });
    });

    it("returns 404 when customer record missing", async () => {
      const req = { userId: 6, body: {} };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ save: jest.fn() });
      Customer.findOne.mockResolvedValue(null);

      await customerController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Không tìm thấy thông tin khách hàng",
      });
    });

    it("returns 500 when update throws", async () => {
      const req = { userId: 7, body: {} };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ save: jest.fn().mockResolvedValue() });
      Customer.findOne.mockRejectedValue(new Error("db fail"));

      await customerController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lỗi khi cập nhật thông tin người dùng",
      });
    });
  });

  describe("changePassword", () => {
    it("changes password successfully", async () => {
      const req = {
        userId: 8,
        body: {
          currentPassword: "OldPass123",
          newPassword: "NewPass456",
          confirmPassword: "NewPass456",
        },
      };
      const res = mockResponse();

      const mockUser = {
        password: "hashed-old",
        save: jest.fn().mockResolvedValue(),
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue("hashed-new");

      await customerController.changePassword(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith("OldPass123", "hashed-old");
      expect(mockUser.password).toBe("hashed-new");
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Đổi mật khẩu thành công" });
    });

    it("validates required fields", async () => {
      const req = { userId: 8, body: { currentPassword: "a" } };
      const res = mockResponse();

      await customerController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Vui lòng nhập đầy đủ thông tin" });
    });

    it("rejects when new password confirmation mismatches", async () => {
      const req = {
        userId: 8,
        body: { currentPassword: "a", newPassword: "b", confirmPassword: "c" },
      };
      const res = mockResponse();

      await customerController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Mật khẩu xác nhận không trùng khớp" });
    });

    it("returns 404 when user not found", async () => {
      const req = {
        userId: 9,
        body: {
          currentPassword: "a",
          newPassword: "b",
          confirmPassword: "b",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await customerController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Không tìm thấy người dùng" });
    });

    it("rejects when current password incorrect", async () => {
      const req = {
        userId: 10,
        body: {
          currentPassword: "wrong",
          newPassword: "b",
          confirmPassword: "b",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ password: "hash" });
      bcrypt.compare.mockResolvedValue(false);

      await customerController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Mật khẩu hiện tại không đúng" });
    });

    it("returns 500 when hashing fails", async () => {
      const req = {
        userId: 11,
        body: {
          currentPassword: "ok",
          newPassword: "b",
          confirmPassword: "b",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ password: "hash", save: jest.fn() });
      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockRejectedValue(new Error("hash fail"));

      await customerController.changePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lỗi hệ thống khi đổi mật khẩu",
      });
    });
  });
});
