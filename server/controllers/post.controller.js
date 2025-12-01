const { Post } = require('../models/index.model');
const adminService = require('../service/admin.service');

//[GET] /api/post: Lấy danh sách bài viết
exports.getPosts = async (req, res) => {
    try {
        const posts = await adminService.getPosts();
        return res.status(200).json({
            message: "Lấy danh sách bài viết thành công",
            posts: posts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lấy danh sách bài viết thất bại",
            error: error.message
        });
    }
}

//[GET] /api/post/:id: Lấy chi tiết bài viết
exports.getPostById = async (req, res) => {
    try {
        const post = await adminService.getPostById(req.params.id);
        return res.status(200).json({
            message: "Lấy chi tiết bài viết thành công",
            post
        });
    } catch (error) {
        const status = error.message === "Bài viết không tồn tại" ? 404 : 500;
        return res.status(status).json({
            message: "Lấy chi tiết bài viết thất bại",
            error: error.message
        });
    }
}

