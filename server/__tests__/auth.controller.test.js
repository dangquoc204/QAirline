const authController = require("../controllers/auth.controller");
const { User, Customer } = require("../models/index.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/index.model", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
  Customer: {
    create: jest.fn(),
  },
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "unit-test-secret";
  });

  describe("register", () => {
    it("creates a new account when email is unused", async () => {
      const req = {
        body: {
          email: "new@example.com",
          title: "Mr",
          password: "Password123",
          first_name: "John",
          middle_name: "",
          last_name: "Doe",
          date_of_birth: "1990-01-01",
          country_name: "VN",
          gender: "male",
          promo_code: null,
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed-password");
      User.create.mockResolvedValue({ id: 1, email: "new@example.com", role: "customer", status: "active" });
      Customer.create.mockResolvedValue({
        id: 10,
        title: "Mr",
        first_name: "John",
        middle_name: "",
        last_name: "Doe",
        date_of_birth: "1990-01-01",
      });
      jwt.sign.mockReturnValue("jwt-token");

      await authController.register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "new@example.com" } });
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: "new@example.com", password: "hashed-password" })
      );
      expect(Customer.create).toHaveBeenCalledWith(
        expect.objectContaining({ user_id: 1, first_name: "John" })
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Tạo tài khoản thành công", token: "jwt-token" })
      );
    });

    it("rejects registration when email already exists", async () => {
      const req = { body: { email: "dup@example.com" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 99 });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email đã tồn tại" });
      expect(User.create).not.toHaveBeenCalled();
    });

    it("validates required password field", async () => {
      const req = { body: { email: "missingpass@example.com" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Mật khẩu là bắt buộc" });
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    it("validates email requirement", async () => {
      const req = { body: { password: "Password123" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email là bắt buộc" });
    });

    it("returns 500 when database throws", async () => {
      const req = { body: { email: "err@example.com", password: "abc" } };
      const res = mockResponse();

      User.findOne.mockRejectedValue(new Error("db down"));

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Đã xảy ra lỗi trong quá trình tạo tài khoản",
      });
    });
  });

  describe("login", () => {
    it("logs in when credentials are valid", async () => {
      const req = { body: { email: "user@example.com", password: "Password123" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 1, email: "user@example.com", password: "hash", role: "customer", status: "active" });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("login-token");

      await authController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "user@example.com" } });
      expect(bcrypt.compare).toHaveBeenCalledWith("Password123", "hash");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Đăng nhập thành công",
        token: "login-token",
      });
    });

    it("rejects when email not found", async () => {
      const req = { body: { email: "none@example.com", password: "anything" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email không tồn tại" });
    });

    it("rejects when account is disabled", async () => {
      const req = { body: { email: "user@example.com", password: "anything" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 1, password: "hash", status: "disabled" });

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Tài khoản bị khóa" });
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it("rejects when password is invalid", async () => {
      const req = { body: { email: "user@example.com", password: "wrong" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 1, password: "hash", status: "active" });
      bcrypt.compare.mockResolvedValue(false);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Mật khẩu không đúng" });
    });

    it("returns 500 when login crashes", async () => {
      const req = { body: { email: "user@example.com", password: "pass" } };
      const res = mockResponse();

      User.findOne.mockRejectedValue(new Error("db fail"));

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Đã xảy ra lỗi trong quá trình đăng nhập",
      });
    });
  });

  describe("forgotPassword", () => {
    it("returns a reset token when email exists", async () => {
      const req = { body: { email: "user@example.com" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 5, role: "customer" });
      jwt.sign.mockReturnValue("reset-token");

      await authController.forgotPassword(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ where: { email: "user@example.com" } });
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 5, action: "password-reset" },
        "unit-test-secret",
        { expiresIn: 900 }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Đã gửi hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra email.",
        resetToken: "reset-token",
      });
    });

    it("returns generic success when email is missing from system", async () => {
      const req = { body: { email: "ghost@example.com" } };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await authController.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.",
      });
    });

    it("validates email presence", async () => {
      const req = { body: {} };
      const res = mockResponse();

      await authController.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email là bắt buộc" });
      expect(User.findOne).not.toHaveBeenCalled();
    });

    it("returns 500 when something breaks", async () => {
      const req = { body: { email: "user@example.com" } };
      const res = mockResponse();

      User.findOne.mockRejectedValue(new Error("db fail"));

      await authController.forgotPassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Đã xảy ra lỗi trong quá trình yêu cầu đặt lại mật khẩu",
      });
    });
  });
});
