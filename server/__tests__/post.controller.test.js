const postController = require("../controllers/post.controller");
const adminService = require("../service/admin.service");

jest.mock("../service/admin.service", () => ({
  getPosts: jest.fn(),
  getPostById: jest.fn(),
}));

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Post Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPosts", () => {
    it("returns posts list", async () => {
      const req = {};
      const res = mockResponse();
      const posts = [{ id: 1 }, { id: 2 }];
      adminService.getPosts.mockResolvedValueOnce(posts);

      await postController.getPosts(req, res);

      expect(adminService.getPosts).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy danh sách bài viết thành công",
        posts,
      });
    });

    it("returns 500 when service fails", async () => {
      const req = {};
      const res = mockResponse();
      adminService.getPosts.mockRejectedValueOnce(new Error("DB down"));

      await postController.getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy danh sách bài viết thất bại",
        error: "DB down",
      });
    });
  });

  describe("getPostById", () => {
    it("returns post detail", async () => {
      const req = { params: { id: "5" } };
      const res = mockResponse();
      const post = { id: 5, title: "Tin" };
      adminService.getPostById.mockResolvedValueOnce(post);

      await postController.getPostById(req, res);

      expect(adminService.getPostById).toHaveBeenCalledWith("5");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy chi tiết bài viết thành công",
        post,
      });
    });

    it("maps not found error to 404", async () => {
      const req = { params: { id: "404" } };
      const res = mockResponse();
      adminService.getPostById.mockRejectedValueOnce(new Error("Bài viết không tồn tại"));

      await postController.getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy chi tiết bài viết thất bại",
        error: "Bài viết không tồn tại",
      });
    });

    it("maps unexpected errors to 500", async () => {
      const req = { params: { id: "5" } };
      const res = mockResponse();
      adminService.getPostById.mockRejectedValueOnce(new Error("DB"));

      await postController.getPostById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Lấy chi tiết bài viết thất bại",
        error: "DB",
      });
    });
  });
});
