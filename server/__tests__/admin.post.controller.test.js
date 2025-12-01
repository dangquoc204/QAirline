const adminController = require("../controllers/admin.controller");
const adminService = require("../service/admin.service");
const { Admin } = require("../models/index.model");

jest.mock("../models/index.model", () => ({
  Admin: {
    findOne: jest.fn(),
  },
  Post: {},
  Airplane: {},
  Flight: {},
  Booking: {},
}));

jest.mock("../service/admin.service", () => ({
  createPost: jest.fn(),
  editPost: jest.fn(),
  deletePost: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Admin Controller - Post management", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createPost", () => {
    it("creates a post when payload is valid and admin exists", async () => {
      const req = {
        userId: 7,
        body: {
          title: "Ưu đãi hè",
          content: "Nội dung",
          postType: "promotion",
        },
      };
      const res = mockResponse();

      Admin.findOne.mockResolvedValueOnce({ id: 3 });
      adminService.createPost.mockResolvedValueOnce({ id: 12 });

      await adminController.createPost(req, res);

      expect(adminService.createPost).toHaveBeenCalledWith(
        "Ưu đãi hè",
        undefined,
        undefined,
        "Nội dung",
        "promotion",
        undefined,
        undefined,
        3
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Tạo bài viết thành công" })
      );
    });

    it("rejects when title is missing", async () => {
      const req = {
        userId: 7,
        body: { title: "   ", content: "Body" },
      };
      const res = mockResponse();

      await adminController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Tiêu đề không được để trống" });
      expect(adminService.createPost).not.toHaveBeenCalled();
    });

    it("rejects when admin not found", async () => {
      const req = { userId: 5, body: { title: "Tin", content: "Body" } };
      const res = mockResponse();

      Admin.findOne.mockResolvedValueOnce(null);

      await adminController.createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Admin không tồn tại" });
    });
  });

  describe("editPost", () => {
    it("updates post successfully", async () => {
      const req = {
        params: { id: "9" },
        body: { title: "Tin cập nhật", content: "Nội dung mới" },
      };
      const res = mockResponse();

      adminService.editPost.mockResolvedValueOnce({ id: 9 });

      await adminController.editPost(req, res);

      expect(adminService.editPost).toHaveBeenCalledWith(
        "9",
        "Tin cập nhật",
        undefined,
        undefined,
        "Nội dung mới",
        undefined,
        undefined
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Cập nhật bài viết thành công" })
      );
    });

    it("returns 404 when post does not exist", async () => {
      const req = { params: { id: "1" }, body: { title: "Tin" } };
      const res = mockResponse();

      adminService.editPost.mockRejectedValueOnce(new Error("Bài viết không tồn tại"));

      await adminController.editPost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Cập nhật bài viết thất bại" })
      );
    });

    it("rejects when content becomes empty", async () => {
      const req = { params: { id: "1" }, body: { content: "   " } };
      const res = mockResponse();

      await adminController.editPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Nội dung không được để trống" });
      expect(adminService.editPost).not.toHaveBeenCalled();
    });
  });

  describe("deletePost", () => {
    it("removes a post successfully", async () => {
      const req = { params: { id: "5" } };
      const res = mockResponse();

      adminService.deletePost.mockResolvedValueOnce({ id: 5 });

      await adminController.deletePost(req, res);

      expect(adminService.deletePost).toHaveBeenCalledWith("5");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Xóa bài viết thành công" })
      );
    });

    it("returns 404 when deleting missing post", async () => {
      const req = { params: { id: "404" } };
      const res = mockResponse();

      adminService.deletePost.mockRejectedValueOnce(new Error("Bài viết không tồn tại"));

      await adminController.deletePost(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Xóa bài viết thất bại" })
      );
    });
  });
});
