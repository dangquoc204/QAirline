const { verifyAdmin } = require("../middlewares/admin.middleware");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("admin middleware - verifyAdmin", () => {
  it("blocks non-admin users with 403", () => {
    const req = { role: "customer" };
    const res = mockResponse();
    const next = jest.fn();

    verifyAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Require Admin Role!" });
    expect(next).not.toHaveBeenCalled();
  });

  it("allows admin role to proceed", () => {
    const req = { role: "admin" };
    const res = mockResponse();
    const next = jest.fn();

    verifyAdmin(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
