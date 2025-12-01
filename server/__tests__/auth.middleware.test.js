const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.middleware");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("auth middleware - verifyToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("rejects when Authorization header missing", () => {
    const req = { headers: {} };
    const res = mockResponse();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects when token not provided after Bearer", () => {
    const req = { headers: { authorization: "Bearer" } };
    const res = mockResponse();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects invalid token with 401", () => {
    const req = { headers: { authorization: "Bearer bad" } };
    const res = mockResponse();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    verifyToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("bad", process.env.JWT_SECRET);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token không hợp lệ." });
    expect(next).not.toHaveBeenCalled();
  });

  it("rejects expired token with dedicated message", () => {
    const req = { headers: { authorization: "Bearer expired" } };
    const res = mockResponse();
    const next = jest.fn();

    const error = new Error("jwt expired");
    error.name = "TokenExpiredError";
    jwt.verify.mockImplementation(() => {
      throw error;
    });

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token hết hạn. Vui lòng đăng nhập lại.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("attaches decoded info and calls next on success", () => {
    const req = { headers: { authorization: "Bearer good" } };
    const res = mockResponse();
    const next = jest.fn();

    jwt.verify.mockReturnValue({ id: 9, role: "admin" });

    verifyToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("good", process.env.JWT_SECRET);
    expect(req.userId).toBe(9);
    expect(req.role).toBe("admin");
    expect(next).toHaveBeenCalledTimes(1);
  });
});
