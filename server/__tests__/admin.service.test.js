const { Op } = require("sequelize");

const mockUserModel = {
  findByPk: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
};

const mockAdminModel = {
  create: jest.fn(),
};

const mockPostModel = {
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn(),
};

jest.mock("../models/index.model", () => ({
  User: mockUserModel,
  Admin: mockAdminModel,
  Post: mockPostModel,
  Flight: {},
  Booking: {},
  Airplane: {},
  Passenger: {},
  Seat: {},
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed-value"),
}));

const bcrypt = require("bcrypt");
const adminService = require("../service/admin.service");

describe("Admin Service - Account management", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createAdminAccount", () => {
    it("creates a new admin when email is unique", async () => {
      const adminActor = { id: 1, role: "admin" };
      const newUserRecord = { id: 5 };

      mockUserModel.findByPk.mockResolvedValueOnce(adminActor);
      mockUserModel.findOne.mockResolvedValueOnce(null);
      mockUserModel.create.mockResolvedValueOnce(newUserRecord);
      mockAdminModel.create.mockResolvedValueOnce({ id: 99 });

      const payload = {
        email: "admin.new@example.com",
        password: "StrongPass123",
        username: "admin.new",
        permissions: ["manage_users"],
      };

      const result = await adminService.createAdminAccount(1, payload);

      expect(mockUserModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ email: "admin.new@example.com", role: "admin" })
      );
      expect(mockAdminModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ user_id: 5 })
      );
      expect(bcrypt.hash).toHaveBeenCalledWith("StrongPass123", 10);
      expect(result).toBe(newUserRecord);
    });

    it("rejects creation when email already exists", async () => {
      mockUserModel.findByPk.mockResolvedValue({ id: 1, role: "admin" });
      mockUserModel.findOne.mockResolvedValue({ id: 99 });

      await expect(
        adminService.createAdminAccount(1, { email: "dup@example.com", password: "abc" })
      ).rejects.toThrow("Email đã được sử dụng cho tài khoản khác.");
    });
  });

  describe("updateUserAccount", () => {
    it("updates role and email when data is valid", async () => {
      const adminActor = { id: 1, role: "admin" };
      const targetUser = {
        id: 2,
        email: "old@example.com",
        role: "customer",
        status: "active",
        save: jest.fn().mockResolvedValue(true),
      };

      mockUserModel.findByPk
        .mockResolvedValueOnce(adminActor)
        .mockResolvedValueOnce(targetUser);
      mockUserModel.findOne.mockResolvedValueOnce(null);

      const result = await adminService.updateUserAccount(1, 2, {
        email: "new@example.com",
        role: "admin",
      });

      expect(targetUser.email).toBe("new@example.com");
      expect(targetUser.role).toBe("admin");
      expect(targetUser.save).toHaveBeenCalled();
      expect(result).toBe(targetUser);
    });

    it("rejects updates when email clashes with another user", async () => {
      const adminActor = { id: 1, role: "admin" };
      const targetUser = { id: 2, email: "old@example.com", save: jest.fn(), status: "active" };

      mockUserModel.findByPk
        .mockResolvedValueOnce(adminActor)
        .mockResolvedValueOnce(targetUser);
      mockUserModel.findOne.mockResolvedValueOnce({ id: 99 });

      await expect(
        adminService.updateUserAccount(1, 2, { email: "dup@example.com" })
      ).rejects.toThrow("Email đã tồn tại.");
    });
  });

  describe("changeUserStatus", () => {
    it("marks a user as disabled", async () => {
      const adminActor = { id: 1, role: "admin" };
      const targetUser = { id: 2, status: "active", save: jest.fn().mockResolvedValue(true) };

      mockUserModel.findByPk
        .mockResolvedValueOnce(adminActor)
        .mockResolvedValueOnce(targetUser);

      const result = await adminService.changeUserStatus(1, 2, "disabled");

      expect(targetUser.status).toBe("disabled");
      expect(targetUser.save).toHaveBeenCalled();
      expect(result).toBe(targetUser);
    });
  });

  describe("deleteUserAccount", () => {
    it("prevents an admin from deleting themselves", async () => {
      mockUserModel.findByPk.mockResolvedValue({ id: 1, role: "admin" });

      await expect(adminService.deleteUserAccount(1, 1)).rejects.toThrow(
        "Không thể tự xóa tài khoản đang đăng nhập."
      );
    });

    it("deletes another user successfully", async () => {
      const adminActor = { id: 1, role: "admin" };
      const targetUser = { id: 2, destroy: jest.fn().mockResolvedValue(true) };

      mockUserModel.findByPk
        .mockResolvedValueOnce(adminActor)
        .mockResolvedValueOnce(targetUser);

      const result = await adminService.deleteUserAccount(1, 2);

      expect(targetUser.destroy).toHaveBeenCalled();
      expect(result).toBe(true);
    });
  });

  describe("searchUsers", () => {
    it("builds the correct filters for keyword, role and status", async () => {
      const adminActor = { id: 1, role: "admin" };
      mockUserModel.findByPk.mockResolvedValueOnce(adminActor);
      mockUserModel.findAll.mockResolvedValueOnce([]);

      await adminService.searchUsers(1, {
        keyword: "duc",
        role: "customer",
        status: "active",
      });

      expect(mockUserModel.findAll).toHaveBeenCalledTimes(1);
      const callArg = mockUserModel.findAll.mock.calls[0][0];
      expect(callArg.where.role).toBe("customer");
      expect(callArg.where.status).toBe("active");
      expect(callArg.where[Op.or]).toHaveLength(2);
    });
  });

  describe("Post management helpers", () => {
    it("creates a post with trimmed values", async () => {
      const createdPost = { id: 10, title: "Tin mới" };
      mockPostModel.create.mockResolvedValueOnce(createdPost);

      const result = await adminService.createPost(
        " Tin mới ",
        null,
        null,
        "   Nội dung   ",
        "news",
        null,
        null,
        1
      );

      expect(mockPostModel.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Tin mới", content: "Nội dung" })
      );
      expect(result).toBe(createdPost);
    });

    it("rejects post creation when title missing", async () => {
      await expect(
        adminService.createPost("   ", null, null, "Body", "news", null, null, 1)
      ).rejects.toThrow("Tiêu đề không được để trống.");
    });

    it("rejects edit when post not found", async () => {
      mockPostModel.findByPk.mockResolvedValueOnce(null);

      await expect(
        adminService.editPost(99, "New title", null, null, "Body")
      ).rejects.toThrow("Bài viết không tồn tại");
    });

    it("rejects edit when new content blank", async () => {
      const postRecord = { save: jest.fn(), title: "Old", content: "Old" };
      mockPostModel.findByPk.mockResolvedValueOnce(postRecord);

      await expect(
        adminService.editPost(1, undefined, null, null, "   ")
      ).rejects.toThrow("Nội dung không được để trống.");
    });

    it("returns a post by id or throws", async () => {
      const postRecord = { id: 5 };
      mockPostModel.findByPk
        .mockResolvedValueOnce(postRecord)
        .mockResolvedValueOnce(null);

      await expect(adminService.getPostById(5)).resolves.toBe(postRecord);
      await expect(adminService.getPostById(6)).rejects.toThrow("Bài viết không tồn tại");
    });
  });
});
